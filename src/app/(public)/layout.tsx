import NavBar from "@/components/navComp/PublicNavHeader";

export default function PublicLayout({ children }: any) {
  return (
    <div className="bg-slate-600 h-screen flex flex-col">
      <NavBar />
      <main className="box-border flex-grow flex flex-col ">
        hello{children}
      </main>
    </div>
  );
}
