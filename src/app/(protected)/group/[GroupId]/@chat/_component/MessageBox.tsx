"use client";
import { GroupPic } from "@/app/(protected)/_components/Avatar/GroupPic";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR from "swr";

function Profile() {
  return (
    <div>
      {/* <h1>{data.name}</h1> */}
      {/* <p>{data.bio}</p> */}
    </div>
  );
}
const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const member = (id: string, array: any[]) =>
  array.find((data) => data.memberId === id);

const MessageBox = ({ GroupId }: { GroupId: string }) => {
  const { data, error, isLoading } = useSWR(
    `/api/groupmessage?group=${GroupId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // console.log(data);

  const getMember = (id: string) => member(id, data.member);

  return (
    <ScrollArea className=" grid flex-1 bg-slate-200 w-full h-full overflow-hidden">
      {data.messages.map((value: any) => {
        const mem = getMember(value.memberId);
        let date = new Date(value.createdBy);
        return (
          <div className="flex items-center gap-4 p-4">
            <GroupPic
              url={mem.PictureUrl}
              groupName={mem.name}
              uniqueName={mem.name}
            />
            <div className="grid gap-2">
              <div className="flex gap-2">
                <h2 className="font-semibold">{mem.name}</h2>
                <p className="font-mono text-[2.5px] text-slate-400">
                  {date.toDateString()}
                </p>
              </div>
              <p>{value.text}</p>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default MessageBox;
