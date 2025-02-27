import { BadgeAlert, BadgeCheck } from "lucide-react";

interface FormMessageProps {
  message?: string;
}

export const FormError = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm font-medium text-destructive">
      <BadgeAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
export const FormSuccess = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm font-medium text-emerald-500">
      <BadgeCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
