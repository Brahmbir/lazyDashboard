import SidebarWrpper from "@/modules/protectedPages/components/SidebarWrapper";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarWrpper defaultOpen>{children}</SidebarWrpper>
    </>
  );
}
