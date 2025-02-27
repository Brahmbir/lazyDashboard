import { EmailDetails } from "../sender";
import { IEmail, CreateMailProcedure } from "./utils";

import WelcomeMail from "./welcome-mail";

export const sendWelcomeMail = async (
  mailInfo: EmailDetails,
  mailData: IEmail
) => await CreateMailProcedure(mailInfo, <WelcomeMail {...mailData} />);

//todo:
//   export { sendPasswordResetMail } from "./password-reset";
//todo:
//   export { sendVerificationMail } from "./verification";
//todo:
//   export { sendInvitationMail } from "./invitation";
