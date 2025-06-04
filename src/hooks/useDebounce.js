import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        const handle = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handle);
        };
    }, [value]);

    return debouncedValue;
}