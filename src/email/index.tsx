import { MyTemplate } from "./templates/Test";
import { renderAsync } from "@react-email/render";

export const TestEmail = (href: string) =>
  renderAsync(<MyTemplate link={href} />, {
    pretty: true,
  });
