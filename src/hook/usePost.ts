import { useState, useEffect } from 'react';

interface FetchState<T> {
  status: number | null;
  error: Error | null;
  isLoading: boolean;
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const usePost = <T>(url: string, data: T, method: HttpMethod): FetchState<T> => {
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData: T = await response.json();
      setStatus(response.status);
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
  return { status, error, isLoading, refetch };
};

export default usePost;
