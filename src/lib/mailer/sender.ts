import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailDetails {
  to: string[] | string;
  subject: string;
}

interface EmailData extends EmailDetails {
  html: string;
}
export default async function sendEmail({ to, subject, html }: EmailData) {
  return await resend.emails.send({
    from: `"Pictorial" <noreply@test.brahmbir.dev>`,
    //   // from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}
