import HomeLink from "@/components/navComp/publicNavComps/HomeLink";
import { FC, Fragment } from "react";
import { VscMenu } from "react-icons/vsc";

interface IHomeLeftDialog {
  action?: null;
  wrapper: FC<any>;
}
interface IHomeLeftNonDialog {
  action: () => void;
  wrapper?: null;
}

type IHomeLeft = IHomeLeftDialog | IHomeLeftNonDialog;

export default function HomeLeft({
  action = () => {},
  wrapper = null,
}: IHomeLeft) {
  const ButtonParent = wrapper ? wrapper : Fragment;
  return (
    <div id="header" className="flex gap-2 h-12">
      <ButtonParent {...(wrapper ? { asChild: true } : {})}>
        <button
          onClick={action ? action : () => {}}
          className="flex items-center justify-center aspect-square gap-1 p-2 rounded-full hover:bg-slate-400"
        >
          <VscMenu className="h-[80%] w-auto" />
        </button>
      </ButtonParent>
      <HomeLink className="" />
    </div>
  );
}
