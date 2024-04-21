import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e: MediaQueryListEvent) {
      setMatches(() => e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);

    setMatches(() => matchQueryList.matches);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
