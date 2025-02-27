import { Header } from "@/components/Navigation/Header";
import * as React from "react";
import Link from "next/link";

export interface INavbarProps {
  MenuBtn: React.ReactNode;
}

export default function Navbar({ MenuBtn }: INavbarProps) {
  return (
    <Header>
      {MenuBtn}
      <Link className="h-full" href="/workspace">
        work
      </Link>
      <Link className="h-full" href="/account">
        user
      </Link>
    </Header>
  );
}
