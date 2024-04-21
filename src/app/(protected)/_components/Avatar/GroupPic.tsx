// "use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function GroupPic({
  url,
  groupName,
  uniqueName,
}: {
  url: string;
  groupName: string;
  uniqueName: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={url} alt={uniqueName} />
      <AvatarFallback>{groupName.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
