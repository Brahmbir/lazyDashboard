// "use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface IMenuBtnProps extends React.HTMLProps<HTMLButtonElement> {
  isClose?: boolean;
}

export function MenuBtn({ isClose = false, type, ...props }: IMenuBtnProps) {
  return (
    <Button
      {...props}
      className="h-full [&_svg]:size-7 px-0"
      variant="ghost"
      size="icon"
      data-sidebar="trigger"
    >
      {isClose ? <X /> : <Menu />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

// export function MenuCloseBtn() {
//   const { toggleSidebar } = useSidebar();

//   return (
//     <Button
//       className="h-full [&_svg]:size-7 px-0"
//       variant="ghost"
//       size="icon"
//       data-sidebar="trigger"
//       onClick={toggleSidebar}
//     >
//       <X />
//       <span className="sr-only">Toggle Sidebar</span>
//     </Button>
//   );
// }
