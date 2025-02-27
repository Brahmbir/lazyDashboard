import { render } from "@react-email/components";
import sendEmail, { EmailDetails } from "../sender";

export const CreateMailProcedure = async (
  mailInfo: EmailDetails,
  MailComponent: React.JSX.Element
) => {
  const html = await render(MailComponent, { pretty: true });
  return sendEmail({ ...mailInfo, html });
};

export interface IEmail {
  name: string;
}

export type IUrlEmail = IEmail & { url: string };
