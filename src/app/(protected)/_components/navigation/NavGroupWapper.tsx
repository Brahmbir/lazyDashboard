import { ScrollArea } from "@/components/ui/scroll-area";

export default function NavGroupWapper({
  children,
}: {
  children: JSX.Element[];
}) {
  return (
    <ScrollArea id="test" className="h-full pt-2 border-slate-800 border-e-2">
      <nav className="mx-3 [&>*]:border-slate-400 divide-y">{children}</nav>
    </ScrollArea>
  );
}
