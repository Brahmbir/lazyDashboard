// import GroupLink from "../_components/GroupLink";
import { validateRequest } from "@/lib/lucia/auth";
import NewGroup from "./_component/NewGroup";
import prisma from "@/lib/db";

export default async function WorkplacePage() {
  const { user } = await validateRequest();

  const members = await prisma.member.findMany({
    where: {
      userId: user?.id,
    },
    include: { Group: true },
  });
  return (
    <main className="flex [&>*]:w-80 flex-wrap justify-around [&>*]:max-w-80 [&>*]:max-h-52 border [&>*]:aspect-[16/10] mt-16 h-fit w-full p-4 gap-4 ">
      {members.map((data) => (
        <div className="rounded-lg p-10 space-y-3 bg-slate-200 [&>h2]:hover:underline">
          <h2 className="font-bold text-3xl">{data.Group.groupName}</h2>
          <p>{data.Group.groupId}</p>
        </div>
      ))}

      <NewGroup />
    </main>
  );
}
