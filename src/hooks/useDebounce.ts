import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

const useDebounce = <T>(
  initialValue: T,
  time: number
): [T, T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  return [debouncedValue, value, setValue];
};

export default useDebounce;
