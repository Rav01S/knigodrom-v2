import { useEffect, useState } from "react";

export default function useIsMobileScreen() {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    setIsMobileScreen(window.matchMedia("(max-width: 767px)").matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobileScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return {
    isMobileScreen,
  };
}
