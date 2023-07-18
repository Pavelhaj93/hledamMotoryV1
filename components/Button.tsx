import React, { FC, ReactNode } from "react";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler;
  color?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
  center?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  color,
  disabled,
  className,
  arrow,
  center,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
        max-md:w-full
        max-md:h-10
        max-md:text-base
        flex
        w-60
        align-center
        justify-center
        items-center
        rounded-lg
        h-12
        mb-10
        px-3
        py-2
        text-2xl
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2`,
        className,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        color === "secondary" &&
          "bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300",
        color === "primary" &&
          "bg-gradient-to-r from-red-500 from-0% to-red-700 to-100% text-white hover:opacity-80 transition-opacity duration-300",
        center && "text-center"
      )}
    >
      <div className="max-lg:block flex flex-row justify-between items-center w-full text-center">
        <span className="max-lg:hidden block w-4"></span>
        {children && <span className="text-center">{children}</span>}
        {arrow && (
          <span className="bg-[url('/images/frontend/icon-rightArrow.png')] bg-cover w-4 h-6 items-end justify-self-end mt-0.5 max-lg:hidden block"></span>
        )}
      </div>
    </button>
  );
};

export default Button;
