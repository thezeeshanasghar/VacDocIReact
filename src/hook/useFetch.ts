import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData: T = await response.json();
      setData(responseData);
    } catch (error) {
        //@ts-ignore
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };
  //@ts-ignore
  return { data, error, isLoading, refetch };
};

export default useFetch;
