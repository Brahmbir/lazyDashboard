"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/provider/SessionProvider";

export function AvatarIcon() {
  const { user } = useSession();
  return (
    <Avatar>
      <AvatarImage src={user?.avatarUrl as string} alt={user?.fullName} />
      <AvatarFallback>
        {user?.fullName?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
