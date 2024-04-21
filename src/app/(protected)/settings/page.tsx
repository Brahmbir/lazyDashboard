import { redirect } from "next/navigation";

export default async function ProtectPage() {
  return redirect("/settings/account");
}
