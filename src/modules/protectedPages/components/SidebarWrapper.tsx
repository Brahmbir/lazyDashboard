import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";

import Navbar from "./Navbar";
import MainMenu from "@/components/MainMenu";
import { SidebarCloseBand, SidebarMenuBand } from "./Menuband";

interface IHomeWrapperProps extends React.HTMLProps<HTMLDivElement> {
  defaultOpen?: boolean;
}
export default function SidebarWrpper({
  defaultOpen = false,
  ...props
}: IHomeWrapperProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex flex-col max-h-dvh overflow-hidden"
    >
      <Navbar MenuBtn={<SidebarMenuBand />} />
      <div className="flex relative">
        <Sidebar className="absolute">
          <SidebarHeader className="p-2">
            <SidebarCloseBand />
          </SidebarHeader>
          <div className="px-3 ">
            <MainMenu />
          </div>
        </Sidebar>
        <SidebarInset className="@container">{props.children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
