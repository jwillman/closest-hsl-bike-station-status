import { useEffect, useState } from "react";

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
    const item = localStorage.getItem(localStorageKey);
    let parsedLocalStorageValue;
    if (item && item.length) {
        parsedLocalStorageValue = JSON.parse(item);
    }

    const [value, setValue] = useState(parsedLocalStorageValue || defaultValue);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useStateWithLocalStorage;
