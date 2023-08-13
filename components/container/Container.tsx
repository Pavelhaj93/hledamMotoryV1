import clsx from "clsx";
import { FC, ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  ref?: any;
}

const Container: FC<ContainerProps> = ({ children, className, ref }) => {
  return (
    <div
      ref={ref}
      className={clsx(`container max-w-7xl px-6 mx-auto my-0`, className)}
    >
      {children}
    </div>
  );
};

export default Container;
