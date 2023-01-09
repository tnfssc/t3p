import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = (_value?: boolean) => setValue((v) => !!_value ?? !v);
  return [value, toggle] as const;
};
