import Link from "next/link";
import React from "react";

const NavLink = ({
  href,
  linkName,
  icon,
}: {
  icon: JSX.Element;
  href: string;
  linkName: string;
}) => {
  return (
    <Link className="flex  gap-3" href={href}>
      <span className="h-full aspect-square [&>*]:w-full [&>*]:h-full">
        {icon}{" "}
      </span>
      <h3>{linkName}</h3>
    </Link>
  );
};

export default NavLink;
