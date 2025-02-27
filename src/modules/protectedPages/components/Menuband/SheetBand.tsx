import MenuBand from "@/components/Navigation/MenuBandBase";
import { MenuBtn } from "@/components/Navigation/MenuBtn";
import { SheetTrigger } from "@/components/ui/sheet";

export function SheetMenuBand() {
  return (
    <MenuBand isLink>
      <SheetTrigger asChild>
        <MenuBtn />
      </SheetTrigger>
    </MenuBand>
  );
}

export function SheetCloseBand() {
  return (
    <MenuBand logoFirst className="justify-between">
      <SheetTrigger asChild>
        <MenuBtn isClose />
      </SheetTrigger>
    </MenuBand>
  );
}
