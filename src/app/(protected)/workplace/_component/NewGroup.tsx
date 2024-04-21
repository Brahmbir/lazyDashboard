import { CiCirclePlus } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewGroupForm } from "./NewGroupForm";

const NewGroup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-80 relative border aspect-[16/10] rounded-md hover:bg-slate-300 transition-colors">
          <span className="[&>*]:h-full [&>*]:text-opacity-20 [&>*]:text-slate-400  fill-current [&>*]:w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square absolute">
            <CiCirclePlus />
          </span>
          Create a WorkSpace
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <NewGroupForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewGroup;
