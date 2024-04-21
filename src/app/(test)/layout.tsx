import Banner from "./_components/navC/Banner";
import SideMenu from "./_components/sideMenu/SideMenu";

export default function AuthLayout({ children }: any) {
  return (
    <div className="bg-slate-600 h-screen flex">
      <Banner />
      {/* <TestNavBar /> */}
      <main className="box-border pt-16 flex-grow flex flex-col h-screen">
        hello{children}
      </main>
    </div>
  );
}
