import { NextResponse } from "next/server";
import { object } from "zod";

interface NullToast {
  method: null;
}

interface NormalToast {
  method: "Success" | "Info" | "Warning" | "Error";
  message: string;
}
interface DescriptionToast {
  method: "Message";
  message: {
    title: string;
    description: string;
  };
}
interface ActionToast {
  method: "Action";
  message: {
    title: string;
    description: string;
    actionData: unknown;
  };
}

export type Toast = NormalToast | DescriptionToast | ActionToast | NullToast;

interface Action {
  success: boolean;
  toast: Toast;
}

interface SuccessAction extends Action {
  success: true;
  message: string;
}
interface FailAction extends Action {
  success: false;
  error: string;
}

export type IAuthAction = SuccessAction | FailAction;
