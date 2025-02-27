import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Header } from "../Navigation/Header";

export function NavWapper({
  children,
  logoComp,
}: {
  children: React.ReactNode;
  logoComp: React.ReactNode;
}) {
  return (
    <Header>
      <nav className="max-w-7xl flex grow justify-between [&>*]:shrink-0 [&>*]:flex [&>*]:items-center mx-auto px-4 sm/nav:px-6 lg/nav:px-8">
        <div>{logoComp}</div>
        <div>
          <Link href={"/workspace"}>workspace</Link>
        </div>
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="@3xl/nav:hidden h-full"
              >
                <Menu />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent aria-describedby={undefined} side="right">
              <SheetTitle className={"sr-only"}>Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-4">{children}</div>
            </SheetContent>
          </Sheet>
          <div className="hidden @3xl/nav:flex @3xl/nav:space-x-8 @3xl/nav:items-center">
            {children}
          </div>
        </div>
      </nav>
    </Header>
  );
}
