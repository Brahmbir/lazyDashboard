import { cn } from "@/lib/utils";
import Logo from "../Logo";

interface IMenuBandProps extends React.HTMLProps<HTMLDivElement> {
  logoFirst?: boolean;
  notShowText?: boolean;
  isLink?: boolean;
}

export default function MenuBand({
  children,
  className,
  isLink = false,
  notShowText = false,
  logoFirst = false,
  ...props
}: IMenuBandProps) {
  return (
    <div {...props} className={cn("flex items-center h-full gap-2", className)}>
      {logoFirst ? (
        <>
          <Logo ShowText={!notShowText} NotLink={!isLink} />
          {children}
        </>
      ) : (
        <>
          {children}
          <Logo ShowText={!notShowText} NotLink={!isLink} />
        </>
      )}
    </div>
  );
}
