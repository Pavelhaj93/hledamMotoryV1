import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex w-full items-center rounded-md border border-input px-3 py-1 text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring bg-white">
        {leftIcon && <div className="mr-2 flex-shrink-0">{leftIcon}</div>}
        <input
          type={type}
          className={cn(
            "flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground text-sm md:text-base",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <div className="ml-2 flex-shrink-0">{rightIcon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
