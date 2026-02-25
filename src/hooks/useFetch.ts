import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic data fetching hook with loading and error states.
 *
 * @example
 * const { data, loading, error } = useFetch<User[]>("/api/users");
 */
export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setState({ data: null, loading: false, error: err.message });
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return state;
}
