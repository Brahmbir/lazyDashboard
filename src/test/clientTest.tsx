"use client";

import { useSession } from "@/provider/SessionProvider";

export default function Test() {
  const data = useSession();
  return (
    <div>
      <p>client component </p>
      {JSON.stringify(data)}
    </div>
  );
}
