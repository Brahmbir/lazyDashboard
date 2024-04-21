import { SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";
import HomeLeft from "../navC/HomeLeft";

export default function SideWrapper({ children }: any) {
  return (
    <SheetContent className="p-0" side={"left"}>
      <SheetHeader>
        <HomeLeft wrapper={SheetClose} />
      </SheetHeader>
      {children}
    </SheetContent>
  );
}
