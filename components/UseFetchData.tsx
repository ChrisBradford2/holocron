import { useState, useEffect } from 'react';

interface Props {
    url: string;
}

export const useFetchData = (url: string) => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        }
        fetchData();
    }, [url]);
    return data;
};