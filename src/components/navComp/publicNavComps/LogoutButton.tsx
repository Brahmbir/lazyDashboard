import Link from "next/link";

export interface IHomeLinkProps {
  className: string;
}

export default function HomeLink(props: IHomeLinkProps) {
  return (
    <Link href="/" className={"-m-1.5 " + props.className}>
      <span className="sr-only">Home page</span>
      <svg fill="none" className="h-full w-auto" viewBox="0 0 32 32">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </Link>
  );
}
