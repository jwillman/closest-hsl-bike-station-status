import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

import useCurrentLocation from "./../useCurrentLocation";
import * as utils from "./../utils.js";

function Location({ setStationIds }) {
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

    const { loading, error, data } = useQuery(ALL_STATIONS);
    const [locationRequested, setLocationRequested] = useState(false);
    const { location, locationError } = useCurrentLocation(locationRequested);

    useEffect(() => {
        if (
            location?.latitude != undefined &&
            location?.longitude != undefined &&
            data?.bikeRentalStations != undefined
        ) {
            let mapsUrl = utils.getGoogleMapsUrl(
                location?.latitude,
                location?.longitude
            );

            console.log(
                `User lat: ${location?.latitude} lon: ${location?.longitude} url: ${mapsUrl}`
            );

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

            let closestStation = stationIdsWithDistance.reduce(
                (result, item) => {
                    let minDistance = result.length
                        ? result[0].distance
                        : item.distance;

                    if (item.distance < minDistance) {
                        minDistance = item.distance;
                        result.length = 0;
                    }

                    if (item.distance === minDistance) {
                        result.push(item);
                    }

                    return result;
                },
                []
            );

            console.log(closestStation);
            setStationIds(closestStation[0].stationId);
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
                <span className="material-icons">my_location</span> Hae lähin
                asema
            </button>
        </div>
    );
}

export default Location;
