import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth/server";

interface IWorkSpacePageProps {}

export default async function WorkSpacePageStructure(
  props: IWorkSpacePageProps
) {
  const session = await getSession();

  //   const allGroup = await getGroupsForUserChached(session?.user.id!);
  return (
    <div className="relative bg-slate-100 flex flex-col overflow-auto gap-4 p-8 py-6">
      <article className="flex flex-1 overflow-auto flex-col space-y-4 ">
        <div>
          <h1 className="text-3xl font-bold">Groups</h1>
          <p className=" text-">List of all groups</p>
        </div>
        <Separator orientation="horizontal" />
        {/* 
        <GroupList groups={allGroup}>
          <CreateGroup />
        </GroupList> */}
      </article>
    </div>
  );
}
