import useCurrentLocation from "./../useCurrentLocation";
import * as utils from "./../utils.js";

function Location() {
    const geolocationOptions = {
        maximumAge: 3000,
        // Using this option you can define when should the location request timeout and
        // call the error callback with timeout message.
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        enableHighAccuracy: true,
    };
    const { location, locationError } = useCurrentLocation(geolocationOptions);

    let locationUrl = utils.getGoogleMapsUrl(
        location?.latitude,
        location?.longitude
    );
    console.log(locationUrl);

    return null;
}

export default Location;
