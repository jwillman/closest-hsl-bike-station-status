import { useEffect, useState } from "react";

type LocalStorageOptions<T> = {
    localStorageKey: string;
    defaultValue: T;
};

const useStateWithLocalStorage = <T,>({
    localStorageKey,
    defaultValue,
}: LocalStorageOptions<T>) => {
    const getInitialValue = () => {
        const item = localStorage.getItem(localStorageKey);
        return item ? JSON.parse(item) : defaultValue;
    };

    const [value, setValue] = useState<T>(getInitialValue());

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);

    return [value, setValue] as const;
};

export default useStateWithLocalStorage;
