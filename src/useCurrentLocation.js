import React, { useEffect, useState, useRef } from "react";

const useCurrentLocation = (options = {}) => {
    // store error message in state
    const [error, setError] = useState();

    // store location in state
    const [location, setLocation] = useState();

    useEffect(() => {
        // If the geolocation is not defined in the used browser you can handle it as an error
        if (!navigator.geolocation) {
            setError("Geolocation is not supported.");
            return;
        }

        // Call the Geolocation API
        navigator.geolocation.getCurrentPosition(
            handleSuccess,
            handleError,
            options
        );
    }, [options]);

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
