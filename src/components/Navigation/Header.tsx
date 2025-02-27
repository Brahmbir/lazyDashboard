import { cn } from "@/lib/utils";

interface INavgationHeaderProps extends React.HTMLProps<HTMLDivElement> {}

export function Header({
  children,
  className,
  ...props
}: INavgationHeaderProps) {
  return (
    <header
      {...props}
      className={cn(
        "@container/nav",
        "flex sticky top-0 z-50 w-full items-center bg-slate-300",
        className
      )}
    >
      <div className="flex h-[var(--header-height)] w-full items-center gap-3 px-5 py-3">
        {children}
      </div>
    </header>
  );
}
