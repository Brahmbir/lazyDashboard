import Link from "next/link";

import Image from "next/image";
import LogoIcon from "./LogoIcon";

export interface ILogoProps {
  NotLink?: boolean;
  ShowText?: boolean;
}

export default function Logo(
  { NotLink, ShowText }: ILogoProps = { NotLink: false, ShowText: false }
) {
  const LogoDesign = () => (
    <div className="grid grid-flow-col items-center h-full gap-2 p-1 select-none">
      <LogoIcon />
      {ShowText && <h1 className="">Pictorial</h1>}
    </div>
  );
  return (
    <>
      {NotLink ? (
        <LogoDesign />
      ) : (
        <Link className="h-full" href="/">
          <LogoDesign />
        </Link>
      )}
    </>
  );
}
