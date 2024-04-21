"use client";
import { useSession } from "@/provider/SessionProvider";

import Icon from "@/components/Icon";
import Link from "next/link";

export interface IHomeLinkProps {
  className?: string;
}

export default function HomeLink(props: IHomeLinkProps) {
  const data = useSession();

  let link = data.user ? "/workplace" : "/";
  return (
    <Link href={link} className={"-m-1.5 " + props.className}>
      <span className="sr-only">Home page</span>
      <Icon />
    </Link>
  );
}
