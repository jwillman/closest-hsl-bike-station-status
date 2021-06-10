import { useQuery, gql } from "@apollo/client";

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

    function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }

    const geolocationOptions = {
        maximumAge: 3000,
        // Using this option you can define when should the location request timeout and
        // call the error callback with timeout message.
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        enableHighAccuracy: true,
    };
    const { location, locationError } = useCurrentLocation(geolocationOptions);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // let locationUrl = utils.getGoogleMapsUrl(
    //     location?.latitude,
    //     location?.longitude
    // );
    // console.log(locationUrl);

    var poslat = location?.latitude;
    var poslng = location?.longitude;

    // for (var i = 0; i < data.bikeRentalStations.length; i++) {
    //     // if this location is within 0.1KM of the user, add it to the list
    //     if (
    //         distance(
    //             poslat,
    //             poslng,
    //             data.bikeRentalStations[i].lat,
    //             data.bikeRentalStations[i].lon,
    //             "K"
    //         ) <= 0.1
    //     ) {
    //         console.log(data.bikeRentalStations[i].name);
    //     }
    // }

    const getLocation = () => {
        return null;
    };

    return (
        <div className="location">
            <a href="" onClick={getLocation}>
                <span className="material-icons">my_location</span> Hae asemat
            </a>
        </div>
    );
}

export default Location;
