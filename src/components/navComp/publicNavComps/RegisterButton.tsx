import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export interface IRegisterButtonProps {
  className?: string;
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const outline =
  "border border-input backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-sm border-indigo-600 hover:bg-indigo-300 text-indigo-600 hover:text-black";

export default function RegisterButton(props: IRegisterButtonProps) {
  return (
    <Link
      href="/register"
      className={`-m-1.5 h-9 px-4 py-2 ${base} ${outline} ${props.className}`}
    >
      Register
    </Link>
  );
}
