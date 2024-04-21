import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import React from "react";
import AllMemberForm from "./AllMemberForm";

const MemberUp = ({ GroupId }: { GroupId: string }) => {
  return (
    <div className="w-full flex justify-between items-center border py-3 px-4 rounded-lg">
      <div className="grid flex-[0.8] ">
        <h3 className="text-xl font-semibold">test</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est sapiente
          suscipit voluptatum perferendis.
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-slate-400 h-10 rounded-2xl px-4 te">
            sreach Members
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <AllMemberForm GroupId={GroupId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberUp;
