"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { LuMenu } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import HomeLink from "./publicNavComps/HomeLink";

import ButtonGroup, {
  IButtonGroupProps,
} from "./publicNavComps/PublicButtonGroup";
import Link from "next/link";

const navigation = [
  { name: "Documentation", href: "/docs" },
  { name: "Contact", href: "/Contact" },
  { name: "About", href: "/about" },
  // { name: "Company", href: "/Contact" },
];

export default function NavBar({ show = "both" }: IButtonGroupProps) {
  const LButtonGroup = () => <ButtonGroup show={show} />;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky h-fit bg-slate-100 inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between px-6 py-4 lg:px-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <HomeLink className="h-12" />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 space-x-4 lg:justify-end">
          <LButtonGroup />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <HomeLink />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <IoCloseOutline className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4 w-fit flex flex-col">
                <LButtonGroup />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
