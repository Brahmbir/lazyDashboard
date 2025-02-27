import { Toast } from "@/components/Toaster";

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
