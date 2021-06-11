import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

import useCurrentLocation from "./../useCurrentLocation";
import * as utils from "./../utils.js";

function Location() {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const getLocation = () => {
        setLocationRequested(true);
    };

    if (location?.latitude != undefined && location?.longitude != undefined) {
        console.log(`lat: ${location?.latitude} lon: ${location?.longitude}`);

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

        let result = stationIdsWithDistance.reduce((result, item) => {
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
        }, []);

        console.log(result);
    }

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
