import { logOut } from "@/action/auth/logAction";
import { validateRequest } from "@/lib/lucia/auth";
import { redirect } from "next/navigation";
import Test from "@/test/clientTest";

export default async function ProtectPage() {
  const { user, session } = await validateRequest();
  console.log(user, session);
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(user)}
      <form action={logOut}>
        <button type="submit">sign out</button>
      </form>
      <Test />
    </main>
  );
}
