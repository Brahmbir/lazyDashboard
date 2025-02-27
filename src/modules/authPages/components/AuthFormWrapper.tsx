import { cn } from "@/lib/utils";

interface IFormWapper {
  children?: React.ReactNode;
  heading?: string;
  description?: string;
  className?: string | undefined;
}

export function FormWapper({
  children,
  heading,
  description,
  className,
}: IFormWapper) {
  return (
    <div
      className={
        "max-w-md w-full mx-auto rounded-2xl space-y-2 p-6 md:p-10 shadow-2xl bg-white dark:bg-black" +
        className
      }
    >
      <div>
        {heading && (
          <h2 className="font-bold md:text-xxl lg:text-3xl text-left text-neutral-900 dark:text-neutral-100">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-neutral-600 font-medium text-left text-xs max-w-sm mt-2 dark:text-neutral-300">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-xs block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
