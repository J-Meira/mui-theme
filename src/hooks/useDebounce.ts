import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (delay = 500, noFirstTimeDelay = true) => {
  const isFirstTime = useRef(noFirstTimeDelay);
  const debouncing = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (debouncing.current) clearTimeout(debouncing.current);
    },
    [],
  );

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        return func();
      }

      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }

      debouncing.current = setTimeout(() => func(), delay);
    },
    [delay],
  );

  return { debounce };
};
