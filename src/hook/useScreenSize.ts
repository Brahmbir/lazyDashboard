import { useMediaQuery } from "./useMediaQuery";

type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface ScreenSizeProps {
  size: ScreenSize | number;
  rangeDirection?: "max" | "min";
}

export function useScreenSize({
  size,
  rangeDirection = "max",
}: ScreenSizeProps) {
  const range = rangeDirection === "min" ? "max-width" : "min-width";

  switch (size) {
    case "sm":
      return useMediaQuery(`(${range}: ${640}px)`);
    case "md":
      return useMediaQuery(`(${range}: ${768}px)`);

    case "lg":
      return useMediaQuery(`(${range}: ${1024}px)`);

    case "xl":
      return useMediaQuery(`(${range}: ${1280}px)`);

    case "2xl":
      return useMediaQuery(`(${range}: ${1536}px)`);

    default:
      return useMediaQuery(`(${range}: ${size}px)`);
  }
}
