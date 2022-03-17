import { useCallback, useEffect, useRef, useState } from "react";

const Cache = new Map<string, unknown>();

export function useCachedState<T>(
  key?: string,
  initialState?: T,
): [T | undefined, (d: T) => void] {
  const data = key ? (Cache.get(key) as T | undefined) : initialState;

  const [state, _setState] = useState<T | undefined>(data);

  const hasSetStateRef = useRef(false);

  const setState = useCallback(
    (d: T) => {
      hasSetStateRef.current = true;
      if (key) {
        Cache.set(key, d);
      }

      _setState(d);
    },
    [key],
  );

  // init cache  with initial data
  useEffect(() => {
    if (key && initialState && !hasSetStateRef.current) {
      setState(initialState);
    }
  }, [key, initialState, setState]);

  // update the cache if we have a state but nothing in the cache
  useEffect(() => {
    if (state && key && !Cache.has(key)) {
      Cache.set(key, state);
    }
  }, [state, key]);

  return [state, setState];
}
