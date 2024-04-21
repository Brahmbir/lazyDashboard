"use client";
import { Toast } from "@/types/authActionType";

import { toast } from "sonner";
import { unknown } from "zod";
export function AutoToast(
  toastData: Toast,
  action?: { label: string; onClick: (data: unknown) => void }
) {
  switch (toastData.method) {
    case "Info":
      toast.info(toastData.message);
      break;
    case "Error":
      toast.error(toastData.message);

      break;
    case "Success":
      toast.success(toastData.message);

      break;
    case "Warning":
      toast.warning(toastData.message);

      break;
    case "Message":
      toast.message(toastData.message.title, {
        description: toastData.message.description,
      });
      break;
    case "Action":
      if (action) {
        toast(toastData.message.title, {
          description: toastData.message.description,
          action: {
            ...action,
            onClick: () => action.onClick(toastData.message.actionData),
          },
        });
      }
      break;
    default:
      break;
  }
}
