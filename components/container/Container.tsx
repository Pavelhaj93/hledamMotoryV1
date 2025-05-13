import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const Container: FC<ContainerProps> = ({ children, className, ref }) => {
  return (
    <div
      ref={ref}
      className={cn("container max-w-7xl px-6 mx-auto my-0", className)}
    >
      {children}
    </div>
  );
};

export default Container;
