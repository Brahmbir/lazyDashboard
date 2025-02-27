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
interface HalfActionToast {
  method: "Action";
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
  };
  action: {
    label: String;
    onClick: () => void;
  };
}

export type Toast =
  | NormalToast
  | DescriptionToast
  | ActionToast
  | HalfActionToast
  | NullToast;
