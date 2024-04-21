"use client";

import HomeLeft from "./HomeLeft";

export const Trigger = () => {
  return (
    <HomeLeft
      action={() => {
        const Menu = document.getElementById("menu_qwertyuiop");
        if (Menu) {
          switch (Menu.dataset.hidden) {
            case "true":
              Menu.dataset.hidden = "false";
              break;
            case "false":
              Menu.dataset.hidden = "true";
              break;
            default:
              Menu.dataset.hidden = "true";
              break;
          }
        }
      }}
    />
  );
};
