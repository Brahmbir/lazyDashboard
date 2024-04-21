import Link from "next/link";
import HomeLink from "@/components/navComp/publicNavComps/HomeLink";
import Image from "next/image";
import LoginButton from "@/components/navComp/publicNavComps/LoginButton";

export default function Example() {
  return (
    <>
      <header className="absolute bg-slate-100 backdrop-filter backdrop-blur-sm bg-opacity-10 inset-x-0 top-0 z-50 outline outline-[1px] outline-gray-100">
        <nav
          className="flex items-center justify-between px-6 py-4 lg:px-12"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            {/*  Home icon goes here */}
            <HomeLink className="h-12" />
          </div>
          <div className="flex flex-1 justify-end">
            {/* <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a> */}
            <LoginButton />
          </div>
        </nav>
      </header>

      <main className="grid min-h-screen relative place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="h-full w-full absolute top-0 left-0 -z-10">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={"/notFound.jpg"}
            aria-hidden="true"
            alt="picture of 5 jelly fishs"
          />
          <div className="h-full w-full absolute bg-gradient-to-t from-slate-950 from-20% to-transparent" />
        </div>
        <div className="text-center ">
          <p className="text-lg font-semibold text-indigo-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-indigo-300">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              scroll={false}
            >
              Go back home
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-indigo-300"
              scroll={false}
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href="#" className=""></a>
          </div>
        </div>
      </main>
    </>
  );
}
