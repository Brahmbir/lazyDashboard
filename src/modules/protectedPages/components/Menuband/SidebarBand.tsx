"use client";
import MenuBand from "@/components/Navigation/MenuBandBase";
import { MenuBtn } from "@/components/Navigation/MenuBtn";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarMenuBand() {
  const { toggleSidebar } = useSidebar();

  return (
    <MenuBand isLink>
      <MenuBtn onClick={toggleSidebar} />
    </MenuBand>
  );
}

export function SidebarCloseBand() {
  const { isMobile, toggleSidebar } = useSidebar();
  return !isMobile ? null : (
    <MenuBand logoFirst className="justify-between">
      <MenuBtn isClose onClick={toggleSidebar} />
    </MenuBand>
  );
}
