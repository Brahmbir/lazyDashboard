import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format<T>(obj: Record<string, unknown> | null): T | null {
  if (!obj) {
    return null;
  }
  return Object.entries(obj).reduce((result, [key, value]) => {
    const newResult = result;

    if (value === null) {
      return newResult;
    }

    if (isDate(value)) {
      newResult[key] = new Date(value);
    } else {
      newResult[key] = value;
    }

    return newResult;
  }, {} as Record<string, unknown>) as T;
}

const isDate = (value: unknown): value is string =>
  typeof value === "string"
    ? new Date(value).toString() !== "Invalid Date" &&
      !Number.isNaN(Date.parse(value))
    : false;
