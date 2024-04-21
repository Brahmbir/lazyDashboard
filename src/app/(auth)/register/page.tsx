import RegisterForm from "@/app/(auth)/_components/forms/register";
import { FormWapper } from "@/app/(auth)/_components/formWapper";
import { validateRequest } from "@/lib/lucia";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export interface IRegisterPageProps {}

export default async function RegisterPage(props: IRegisterPageProps) {
  const { user } = await validateRequest();

  if (user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <FormWapper
      heading="Register"
      // description="Register in to get an access "
      className="text-red-500"
    >
      <RegisterForm />
    </FormWapper>
  );
}
