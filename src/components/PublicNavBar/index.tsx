import * as React from "react";
import { NavWapper } from "./NavWapper";

import Logo from "@/components/Logo";
import Link from "next/link";

const navigation = [
  { name: "Documentation", href: "/docs" },
  { name: "Contact", href: "/Contact" },
  { name: "About", href: "/about" },
  // { name: "Company", href: "/Contact" },
];

export interface IPublicNavBarProps {
  showLogin?: boolean;
  showRegister?: boolean;

  className?: React.HTMLProps<HTMLElement>["className"];
}

export default function PublicNavBar(props: IPublicNavBarProps) {
  return (
    <NavWapper logoComp={<Logo ShowText />}>
      <>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {item.name}
          </Link>
        ))}
        {props.showRegister && <Link href="/sign-up">signUp</Link>}
        {props.showLogin && <Link href="/sign-in">signIn</Link>}
      </>
    </NavWapper>
  );
}
