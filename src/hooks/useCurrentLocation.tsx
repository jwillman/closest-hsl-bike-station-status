import { useEffect, useState } from "react";

type Location = {
    latitude: number;
    longitude: number;
};

const useCurrentLocation = (locationRequested: boolean) => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const [location, setLocation] = useState<Location>();

    useEffect(() => {
        if (!locationRequested) return;

        // If the geolocation is not defined in the used browser you can handle it as an error
        if (!navigator.geolocation) {
            // TODO localize error message
            setErrorMessage("Geolocation is not supported.");
            return;
        }

        // Call the Geolocation API
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
            maximumAge: 3000,
            // Using this option you can define when should the location request timeout and
            // call the error callback with timeout message.
            timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
            enableHighAccuracy: true,
        });
    }, [locationRequested]);

    // Success handler for geolocations getCurrentPosition method
    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        setLocation({
            latitude,
            longitude,
        });
    };

    // Error handler for geolocations getCurrentPosition method
    const handleError = (error: GeolocationPositionError) => {
        setErrorMessage(error.message);
    };

    return { location, error: errorMessage };
};

export default useCurrentLocation;
