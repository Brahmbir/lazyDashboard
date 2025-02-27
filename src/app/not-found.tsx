import PublicNavBar from "@/components/PublicNavBar";
import NotFoundBG from "@/modules/publicPages/home/components/bg-panels/NotFoundBG";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <PublicNavBar showLogin showRegister />
      <main
        className=" flex-grow h-max top-(--nav-h)
       grid relative place-items-center px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="h-full w-full -z-50 absolute top-0 left-0">
          <NotFoundBG
            layers={[0.9, 0.75, 0.5, 1, 0.35]}
            layerDisplacement={[10, 0.9]}
          />
          <div
            className="
          top-0 bg-[#00000006] shadow-[inset_0px_0px_4em_1em_#000000_,_0px_0px_0px_10px_#000000] 
          md:shadow-[inset_0px_0px_6em_1.2em_#000000_,_0px_0px_0px_10px_#000000] h-full z-20 w-full 
          absolute "
          />
        </div>
        <section className="text-center bg-[#00000099] px-6 py-8 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg backdrop- border border-gray-600">
          <p className="text-lg font-semibold text-indigo-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-indigo-300">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-y-5 items-center [&>*]:w-fit justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
               text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              scroll={false}
            >
              Go back home
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold underline hover:no-underline decoration-1 text-indigo-300"
              scroll={false}
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
