import AuthNavBar from "@/components/navComp/PublicNavHeader";

export interface IAuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <div
      style={{
        backgroundSize: "100% 100%",
        backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",

        backgroundImage:
          "repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 21% 78%, #7B00FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #073AFFFF 100%)",
      }}
      className="h-screen flex flex-col"
    >
      <AuthNavBar />
      <main className="flex-grow flex">
        <div className="flex-grow my-auto">{children}</div>
      </main>
    </div>
  );
}
