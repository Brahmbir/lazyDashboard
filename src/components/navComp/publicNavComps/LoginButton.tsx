import Link from "next/link";

export interface ILoginButtonProps {
  className?: string;
}

export default function LoginButton(props: ILoginButtonProps) {
  return (
    <Link
      href="/login"
      className={`-m-1.5 h-9 px-4 py-2 shadow bg-indigo-600 text-indigo-50 outline-none hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${props.className}`}
    >
      Log in
    </Link>
  );
}
