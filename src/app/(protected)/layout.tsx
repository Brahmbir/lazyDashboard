import Banner from "@/app/(protected)/_components/Banner";
import { validateRequest } from "@/lib/lucia/auth";
import { redirect } from "next/navigation";

export default async function SettingsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, session } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <Banner>{children}</Banner>;
    </div>
  );
}
