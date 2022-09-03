import { useEffect, useState } from "react";

const useStateWithLocalStorage = (localStorageKey: any, defaultValue: any) => {
    const item = localStorage.getItem(localStorageKey);
    let parsedLocalStorageValue;
    if (item && item.length) {
        parsedLocalStorageValue = JSON.parse(item);
    }

    const [value, setValue] = useState(parsedLocalStorageValue || defaultValue);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue];
};

export default useStateWithLocalStorage;
