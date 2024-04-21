"use client";
import { useScreenSize } from "@/hook/useScreenSize";
import HomeLeft from "./HomeLeft";
import SideMenu from "../sideMenu/SideMenu";
import SideWrapper from "../sideMenu/SideWrapper";
import { useRef } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function Banner({ children }: any) {
  const isScreenLessThanLG = useScreenSize({ size: "lg" });
  const NonDialogMenu = useRef<HTMLDivElement>(null);

  return (
    <>
      <Sheet>
        <div className="top-0 w-full z-40 bg-slate-100 fixed">
          <div
            className="px-4 py w-full h-16 flex flex-row items-center justify-between"
            role="banner"
          >
            {isScreenLessThanLG ? (
              <HomeLeft
                action={() => {
                  if (NonDialogMenu.current) {
                    if (NonDialogMenu.current.dataset.hidden === "false") {
                      NonDialogMenu.current.dataset.hidden = "true";
                    } else {
                      NonDialogMenu.current.dataset.hidden = "false";
                    }
                  }
                }}
              />
            ) : (
              <HomeLeft wrapper={SheetTrigger} />
            )}

            {/* <div id="center" className="flex">
          <div className="">j</div>
        </div> */}
            <div id="right" className="flex">
              <div className="">h</div>
            </div>
          </div>
        </div>

        {isScreenLessThanLG ? (
          <div
            ref={NonDialogMenu}
            data-hidden={false}
            className="box-border pt-16 pb-1 h-full data-[hidden=false]:grid data-[hidden=true]:hidden group-data-[show=true]:grid space-y-4 min-w-72 max-w-fit bg-slate-200 overscroll-none"
          >
            <SideMenu key={"non-dialog"} />
          </div>
        ) : (
          <SideWrapper key={"dialog"}>
            <SideMenu />
          </SideWrapper>
        )}
      </Sheet>
      {children}
    </>
  );
}
