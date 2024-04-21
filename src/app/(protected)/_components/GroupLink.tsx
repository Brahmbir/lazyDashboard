import prisma from "@/lib/db";
import { validateRequest } from "@/lib/lucia/auth";
import Link from "next/link";
import { GroupPic } from "./Avatar/GroupPic";

const NavLink = ({
  href,
  linkName,
  icon,
}: {
  icon: JSX.Element;
  href: string;
  linkName: string;
}) => {
  return (
    <Link className="flex gap-4 items-center" href={href}>
      <span className="h-full relative aspect-square [&>*]:w-[120%] [&>*]:-translate-y-[10%] [&>*]:h-[120%]">
        {icon}
      </span>
      <h3 className="f-full text-center">{linkName}</h3>
    </Link>
  );
};

async function getData() {
  const { user } = await validateRequest();

  const members = await prisma.member.findMany({
    where: {
      userId: user?.id,
    },
    include: { Group: true },
  });

  return members;
}

const GroupLink = async () => {
  const data = await getData();
  return (
    <>
      {data.map((values, index) => {
        if (values) {
          return (
            <NavLink
              key={index}
              icon={
                <GroupPic
                  groupName={values.Group.groupName}
                  uniqueName={values.Group.uniqueName}
                  url={values.Group.PictureUrl as string}
                />
              }
              linkName={values.Group.groupName}
              href={`/group/${values.Group.groupId}`}
            />
          );
        }
      })}
    </>
  );
};

export default GroupLink;
