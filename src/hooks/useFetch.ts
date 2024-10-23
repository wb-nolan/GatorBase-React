import { useState, useEffect } from 'react';

type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
};

function useFetch<T>(url: string): FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: T = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
