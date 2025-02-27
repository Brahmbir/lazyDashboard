import { getSession } from "@/lib/auth/server"; // path to your Better Auth server instance
import SubPanelWrpper from "@/modules/protectedPages/components/SubPanelWrapper";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SubPanelWrpper>{children}</SubPanelWrpper>;
}
