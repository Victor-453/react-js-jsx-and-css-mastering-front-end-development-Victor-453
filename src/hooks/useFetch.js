import { useEffect, useState, useCallback, useRef } from 'react';

// Generic data fetching hook that accepts an async function returning data.
// Provides: data, loading, error, refetch.
// Optional params: deps (array), enabled (boolean), immediate (boolean) – immediate defaults true.
export function useFetch(
  asyncFn,
  { deps = [], enabled = true, immediate = true } = {}
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate && enabled);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      if (mountedRef.current) setData(result);
    } catch (e) {
      if (mountedRef.current) setError(e);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [asyncFn, enabled]);

  useEffect(() => {
    mountedRef.current = true;
    if (immediate && enabled) run();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); // re-run when deps change

  return { data, loading, error, refetch: run };
}
