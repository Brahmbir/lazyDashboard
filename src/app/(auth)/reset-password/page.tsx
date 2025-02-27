import { DEFAULT_LOGIN_REDIRECT } from "@/utils/AuthRoutes";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <>
      <div>
        <h2 className="font-bold md:text-xxl lg:text-3xl text-left text-neutral-900 dark:text-neutral-100">
          password reset
        </h2>
      </div>
    </>
  );
}
