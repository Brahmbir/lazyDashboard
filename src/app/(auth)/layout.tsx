import { FormWapper } from "@/modules/authPages/components/AuthFormWrapper";
import NavBar from "@/components/PublicNavBar";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      style={{
        backgroundSize: "max(max(100vw,100vh),1000px)",
        backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",
        backgroundImage:
          "repeating-radial-gradient(75% 75% at -218% 218%, #00FFFF12 30%, #073AFF14 39%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 21% 78%, #7B00FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #073AFFFF 100%)",
      }}
      className="h-screen flex flex-col"
    >
      <NavBar showLogin showRegister />
      <main className="grow flex">
        <div className="grow my-auto max-w-md w-full mx-auto rounded-2xl space-y-2 p-6 md:p-10 shadow-2xl bg-white dark:bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}
