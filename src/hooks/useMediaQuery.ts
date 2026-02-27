import { useState, useEffect } from "react";

/**
 * Track CSS media query matches reactively.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener("change", handler);
    setMatches(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
