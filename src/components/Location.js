import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

import useCurrentLocation from "./../useCurrentLocation";
import * as utils from "./../utils.js";

function Location({ setStationIds, stationCount = 5 }) {
    const ALL_STATIONS = gql`
        query AllStations {
            bikeRentalStations {
                name
                stationId
                lat
                lon
            }
        }
    `;

    const [locationRequested, setLocationRequested] = useState(false);
    const { loading, error, data } = useQuery(ALL_STATIONS);
    const { location, locationError } = useCurrentLocation(locationRequested);

    useEffect(() => {
        if (
            location?.latitude != undefined &&
            location?.longitude != undefined &&
            data?.bikeRentalStations != undefined &&
            locationRequested === true
        ) {
            let stationIdsWithDistance = data.bikeRentalStations.map((x) => {
                return {
                    distance: utils.getDistanceFromLatLonInKm(
                        location.latitude,
                        location.longitude,
                        x.lat,
                        x.lon
                    ),
                    stationId: x.stationId,
                };
            });

            stationIdsWithDistance.sort((a, b) => a.distance - b.distance);
            const closestStationIds = stationIdsWithDistance
                .slice(0, stationCount)
                .map((item) => item.stationId);

            setStationIds(closestStationIds);
            setLocationRequested(false);
        }
    }, [
        data?.bikeRentalStations,
        location?.latitude,
        location?.longitude,
        locationRequested,
    ]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const getLocation = () => {
        setLocationRequested(true);
    };

    return (
        <div className="location">
            <button onClick={getLocation}>
                <span className="material-icons">my_location</span> Hae lähimmät
                asemat
            </button>
        </div>
    );
}

export default Location;
