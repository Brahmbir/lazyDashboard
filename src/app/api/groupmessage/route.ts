import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  let Group = request.nextUrl.searchParams.get("group");
  const data = await prisma.group.findUnique({
    where: { groupId: Group! },
    include: { messageBox: true },
  });

  const dataMember = await prisma.member.findMany({
    where: {
      GroupId: Group!,
    },
  });

  return NextResponse.json(
    { messages: data?.messageBox, member: dataMember },
    { status: 200 }
  );
};
