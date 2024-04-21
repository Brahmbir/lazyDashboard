"use server";
import z from "zod";

import prisma from "@/lib/db";
import { IAuthAction } from "@/types/authActionType";

const formSchema = z.object({
  message: z.string(),
});

export const sendMessage = async (
  values: string,
  GroupId: string,
  email: string
): Promise<IAuthAction | void> => {
  const member = await prisma.member.findUnique({
    where: { email_GroupId: { GroupId: GroupId, email: email } },
  });
  if (!member) {
    return;
  }
  await prisma.message.create({
    data: {
      text: values,
      GroupId: GroupId,
      memberId: member.memberId,
    },
  });
};
