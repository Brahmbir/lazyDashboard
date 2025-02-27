import { DEFAULT_LOGIN_REDIRECT } from "@/utils/AuthRoutes";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

import EmailSignUpForm from "@/modules/authPages/forms/SignUp";

export default async function SignUpPage() {
  return (
    <>
      <div>
        <h2 className="font-bold md:text-xxl lg:text-3xl text-left text-neutral-900 dark:text-neutral-100">
          Sign Up
        </h2>
        <p className="text-neutral-600 font-medium text-left text-xs max-w-sm mt-2 dark:text-neutral-300">
          Register in to get an access to the platform
        </p>
      </div>
      <EmailSignUpForm />
    </>
  );
}
