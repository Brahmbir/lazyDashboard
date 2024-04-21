import { validateRequest } from "@/lib/lucia/auth";
import LoginForm from "@/app/(auth)/_components/forms/login";
import { FormWapper } from "@/app/(auth)/_components/formWapper";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export interface ILoginPageProps {}

export default async function LoginPage(props: ILoginPageProps) {
  const { user } = await validateRequest();

  if (user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <FormWapper heading="Login" className="text-red-500">
      <LoginForm />
    </FormWapper>
  );
}
