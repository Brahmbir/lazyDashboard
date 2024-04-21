import prisma from "@/lib/db";
import MemberUp from "./_component/memberUp";
import { AllMembers } from "./_component/allMembers";

const GroupPage = ({ params }: { params: { GroupId: string } }) => {
  return (
    <div className="w-full h-full flex flex-col px-2 py-4 gap-4">
      <MemberUp GroupId={params.GroupId} />
      <div>
        <AllMembers GroupId={params.GroupId} />
        {/* {data.map((value) => {
          return <div>{JSON.stringify(value.memberId)}</div>;
        })} */}
      </div>
    </div>
  );
};

export default GroupPage;
