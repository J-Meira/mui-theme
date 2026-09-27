import { useState } from 'react';

export const useSyncedState = <T>(propValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(propValue);
  const [prevPropValue, setPrevPropValue] = useState(propValue);

  if (propValue !== prevPropValue) {
    setPrevPropValue(propValue);
    setValue(propValue);
  }

  return [value, setValue];
};
