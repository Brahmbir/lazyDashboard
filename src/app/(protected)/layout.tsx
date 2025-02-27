import { getSession } from "@/lib/auth/server"; // path to your Better Auth server instance
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <>
      {/* <pre className="absolute z-50 top-[30%] right-0">
        <code>{JSON.stringify(session)}</code>
      </pre> */}
      {children}
    </>
  );
}
