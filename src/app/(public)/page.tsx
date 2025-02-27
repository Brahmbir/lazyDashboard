import NavBar from "@/components/PublicNavBar";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  // const [test] = trpc.hello.useSuspenseQuery({ text: "world" });
  return (
    <>
      <NavBar showLogin showRegister />
      {/* {test.greeting} */}
      {JSON.stringify(hello)}
    </>
  );
}
