import { FormItem as FItem, FormMessage as FMessage } from "../ui/form";

export const FormItem = ({ children }: { children: JSX.Element[] }) => {
  return (
    <FItem className="grid gap-y-1 space-y-0 grid-rows-2 grid-cols-2 items-center text-left">
      {children}
    </FItem>
  );
};

export const FormMessage = () => (
  <FMessage className="text-right text-xs m-0 leading-none" />
);
