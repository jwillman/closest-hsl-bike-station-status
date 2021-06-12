import { useEffect, useState } from "react";

const useCurrentLocation = (locationRequested) => {
    // store error message in state
    const [error, setError] = useState();

    // store location in state
    const [location, setLocation] = useState();

    useEffect(() => {
        if (!locationRequested) return;

        // If the geolocation is not defined in the used browser you can handle it as an error
        if (!navigator.geolocation) {
            setError("Geolocation is not supported.");
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

    // Success handler for geolocation's `getCurrentPosition` method
    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
            latitude,
            longitude,
        });
    };

    // Error handler for geolocation's `getCurrentPosition` method
    const handleError = (error) => {
        setError(error.message);
    };

    return { location, error };
};

export default useCurrentLocation;
