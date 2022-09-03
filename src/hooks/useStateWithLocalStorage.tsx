import { useEffect, useState } from "react";

const useStateWithLocalStorage = <T,>({
    localStorageKey,
    defaultValue,
}: {
    localStorageKey: string;
    defaultValue: T;
}) => {
    const item = localStorage.getItem(localStorageKey);
    let parsedLocalStorageValue;
    if (item && item.length) {
        parsedLocalStorageValue = JSON.parse(item);
    }

    const [value, setValue] = useState<T>(
        parsedLocalStorageValue || defaultValue
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue] as const;
};

export default useStateWithLocalStorage;
