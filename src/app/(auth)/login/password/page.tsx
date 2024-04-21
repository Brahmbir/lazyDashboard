import { validateRequest } from "@/lib/lucia/auth";
import { FormWapper } from "@/app/(auth)/_components/formWapper";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import PasswordForm from "@/app/(auth)/_components/forms/passwordForm";

export default async function ForgotenPassPage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <FormWapper
      heading="Reset password"
      description="hello my name is brahmbir"
      className="text-red-500"
    >
      <PasswordForm />
    </FormWapper>
  );
}
