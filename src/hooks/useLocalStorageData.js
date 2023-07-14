import { useEffect, useState } from "react";

export const useLocalStorageData = (key, initialData = null) => {
    const getLocalStorageData = () => JSON.parse(localStorage.getItem(key));
   
    const setLocalStorageData = (key, value) => 
    localStorage.setItem(key, JSON.stringify(value));

    const [data, setData] = useState(getLocalStorageData(key) || initialData );

    useEffect(() => {
        setLocalStorageData(key, data)
    }, [data, key]);

    return [data, setData];



};
