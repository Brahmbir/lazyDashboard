"use server";
import z from "zod";

import prisma from "@/lib/db";
import { IAuthAction } from "@/types/authActionType";

const formSchema = z.object({
  email: z.string().email(),
});

export const AllAction = async (
  values: z.infer<typeof formSchema>,
  GroupId: string
) => {
  let result = formSchema.safeParse(values);

  if (!result.success) {
    return { success: false };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (!user) {
    return { success: false };
  }
  try {
    const member = await prisma.member.create({
      data: {
        status: "Active",
        email: result.data.email,
        name: user.name,
        GroupId: GroupId,
        userId: user.id,
        PictureUrl: user.PictureUrl,
      },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};
