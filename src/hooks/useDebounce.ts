import { useCallback, useRef } from 'react';

export const useDebounce = (delay = 500, noFirstTimeDelay = true) => {
  const isFirstTime = useRef(noFirstTimeDelay);
  const debouncing = useRef<NodeJS.Timeout>(null);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay],
  );

  return { debounce };
};
