import { useCallback, useState } from "react";

/**
 * Simple boolean toggle hook.
 *
 * @example
 * const [isOpen, toggle, setIsOpen] = useToggle(false);
 * <button onClick={toggle}>Toggle</button>
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue] as const;
}
