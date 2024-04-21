import prisma from "@/lib/db";

const GroupPage = async ({ params }: { params: { GroupId: string } }) => {
  // const data = await prisma.member.findMany({
  //   where: {
  //     GroupId: params.GroupId,
  //   },
  // });
  // console.log(data);

  return (
    <div>
      settingPage{" "}
      <div>
        {/* {data.map((value) => {
          return <div>{JSON.stringify(value)}</div>;
        })} */}
      </div>
    </div>
  );
};

export default GroupPage;
