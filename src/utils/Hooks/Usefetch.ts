import { useEffect, useState } from "react";
import InvokeAPI from "../../lib/network/invokeapi/invokeapi";

interface UseFetchResult<T> {
  products: T | null;
  loading: boolean;
  error: string;
}

const useFetch = <T = any>(
  endpoint: string,
  method: string,
  header?: any,
  query?: any,
  urlParam?: any,
  body?: any
): UseFetchResult<T> => {
  const [products, setProducts] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apicall = async () => {
      try {
        const res = await InvokeAPI(endpoint, method, body, header, query);
        setProducts(res.data as T);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || "An error occurred");
        setLoading(false);
      }
    };
    apicall();
  }, [endpoint, method, body, header, query]);

  return { products, loading, error };
};

export default useFetch;
