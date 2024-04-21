"use client";
import { NextUIProvider } from "@nextui-org/system";

export default function Provider({
  children,
}: {
  children: JSX.Element | any;
}) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}
