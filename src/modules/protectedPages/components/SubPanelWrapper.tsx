import { SidebarInset } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
// import MenuBtn, { CloseBtn, CloseHeader } from "../MenuButton";
import MainMenu from "@/components/MainMenu";
import Navbar from "./Navbar";
import { SheetCloseBand, SheetMenuBand } from "./Menuband";

interface ISubPanelWrpperProps extends React.HTMLProps<HTMLDivElement> {
  defaultOpen?: boolean;
}
export default function SubPanelWrpper({
  defaultOpen = false,
  ...props
}: ISubPanelWrpperProps) {
  return (
    <Sheet>
      <Navbar MenuBtn={<SheetMenuBand />} />
      <div className="flex overflow-hidden">
        <SheetContent
          side={"left"}
          className="w-(--sidebar-width) bg-sidebar text-sidebar-foreground [&>button]:hidden p-3 flex flex-col gap-3"
        >
          <SheetHeader>
            <SheetCloseBand />
            <SheetTitle className="hidden"> Navigation area</SheetTitle>
            <SheetDescription className=" hidden ">
              Navigation area
            </SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full px-1 flex-col">
            <MainMenu />
          </div>
        </SheetContent>
        <SidebarInset className="@container">
          <div className="flex flex-col @6xl:flex-row h-full">
            {props.children}
          </div>
        </SidebarInset>
      </div>
    </Sheet>
  );
}
