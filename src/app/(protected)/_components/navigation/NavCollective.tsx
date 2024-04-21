import NavGroup from "./NavGroup";
import NavGroupWapper from "./NavGroupWapper";
import { MdHome } from "react-icons/md";
import NavLink from "./NavLink";
import GroupLink from "../GroupLink";

import { FaGear } from "react-icons/fa6";

export default function NavCollective() {
  return (
    <NavGroupWapper>
      <NavGroup>
        <NavLink href="/workplace" icon={<MdHome />} linkName="Home" />
      </NavGroup>
      <NavGroup title={"Workspace"}>
        <GroupLink />
      </NavGroup>
      <NavGroup>
        <NavLink href="/settings" icon={<FaGear />} linkName="Settion" />
        {/* <NavLink href="/workplace" icon={<MdHome />} linkName="Home" /> */}
        {/* <NavLink href="/workplace" icon={<MdHome />} linkName="Home" /> */}
      </NavGroup>
    </NavGroupWapper>
  );
}

// hover:text-white dark:text-neutral-200 transition duration-200
