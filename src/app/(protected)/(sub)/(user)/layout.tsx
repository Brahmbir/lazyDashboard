import { SubNavBar } from "@/modules/protectedPages/components/SubNavBar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SubNavBar heading="Account">test</SubNavBar>
      {children}
    </>
  );
}
