import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item === null ? defaultValue : JSON.parse(item);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);

  return [value, setValue] as const;
};
