"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export interface ISubNavWrapProps extends React.HTMLProps<HTMLDivElement> {
  heading: string;
}

export function SubNavBar({ heading, children, ...props }: ISubNavWrapProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div className="@6xl:hidden border-b bg-white px-4 py-1 flex justify-between items-center">
        <h1 className="text-xl font-bold">{heading}</h1>
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div
        className={`w-full @6xl:w-64 border-r bg-white ${isMobileMenuOpen ? "block" : "hidden"} @6xl:block`}
      >
        <div className="p-4 hidden @6xl:block">
          <h1 className="text-xl font-bold">{heading}</h1>
        </div>
        <nav className="space-y-1 px-2">{children}</nav>
      </div>
    </>
  );
}
