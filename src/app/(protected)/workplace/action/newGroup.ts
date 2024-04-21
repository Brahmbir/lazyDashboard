"use server";

import z from "zod";

import { NewGroupSchema } from "../schema/NewGroup";

import { GetUserByEmail, GetUserById } from "@/queries/user";
import { IAuthAction } from "@/types/authActionType";
import prisma from "@/lib/db";

export const CreateNewGroup = async (
  values: z.infer<typeof NewGroupSchema>,
  user: any
): Promise<IAuthAction> => {
  try {
    NewGroupSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      toast: { method: "Error", message: "Schema do not match at sever" },
      error: error.message,
    };
  }

  const ExistingGroup = await prisma.group.findUnique({
    where: {
      uniqueName: values.uniqueGroupName,
    },
  });
  if (ExistingGroup) {
    return {
      success: false,
      error: "please choose another Unique name",
      toast: {
        method: "Error",
        message: "This Unique name already exist",
      },
    };
  }
  if (!values.name) {
    return {
      success: false,
      error: "please enter the name of the Group",
      toast: {
        method: "Error",
        message: "Group name was not found",
      },
    };
  }

  const userdata = await GetUserById(user.id);
  if (!userdata) {
    return {
      success: false,
      error: "user was not found",
      toast: {
        method: "Error",
        message: "user was not found",
      },
    };
  }

  const group = await prisma.group.create({
    data: {
      groupName: values.name,
      uniqueName: values.uniqueGroupName,
      members: {
        create: {
          email: userdata.email,
          name: userdata.name,
          status: "Owner",
          PictureUrl: userdata.PictureUrl,
          userId: userdata.id,
        },
      },
    },
  });

  return {
    success: true,
    message: "group created",
    toast: { method: "Success", message: "Group successful created" },
  };
};
