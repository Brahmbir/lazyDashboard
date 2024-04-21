import { ScrollArea } from "@/components/ui/scroll-area";
import HomeLeft from "../navC/HomeLeft";

export default function SideMenu() {
  return (
    <ScrollArea className="flex-grow w-full pt-2 bg-slate-400 ">
      <nav className="mx-3 divide-y">
        <MenuGroup title={"title"}>
          <p>test</p>
          <button>test</button>

          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
        </MenuGroup>
        <MenuGroup title={"title"}>
          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
          <button className="hover:bg-[#616467] transition duration-200">
            Playlist
          </button>
        </MenuGroup>{" "}
        <MenuGroup title={"title"}>
          <button className="px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            Playlist
          </button>
          <button className="px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            Playlist
          </button>
          <button className="px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            Playlist
          </button>
        </MenuGroup>
        {/* <div className="grid gap-2">
          <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Playlist
          </button>
          <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Playlist
          </button>
          <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Playlist
          </button>{" "}
          <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Playlist
          </button>{" "}
          <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Playlist
        </button> */}
        {/* </div> */}
      </nav>
    </ScrollArea>
  );
}

interface IMenuGroup {
  children: JSX.Element[];
  title: string | JSX.Element | null;
}

export function MenuGroup({ children }: IMenuGroup) {
  return (
    <div className="grid gap-px py-2 [&>*]:flex [&>*]:box-content [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-xl [&>*]:h-6 [&>*]:uppercase [&>*]:font-semibold [&>*]:bg-transparent">
      {children}
    </div>
  );
}

// hover:text-white dark:text-neutral-200 transition duration-200
