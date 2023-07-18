import clsx from "clsx";
import { FC, ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx(`container max-w-7xl px-6 mx-auto my-0`, className)}>
      {children}
    </div>
  );
};

export default Container;
