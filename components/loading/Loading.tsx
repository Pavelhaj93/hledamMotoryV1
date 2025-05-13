"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean;
  delayed?: boolean;
  /**
   * The time of a delay
   * @default 700
   */
  delay?: number;
  hideLabel?: boolean;
  label?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  centered,
  delayed,
  delay = 700,
  label,
  hideLabel,
  className,
  ...props
}) => {
  const [showComponent, setShowComponent] = useState(!delayed);

  useEffect(() => {
    if (!delayed) return;
    const timer = setTimeout(() => setShowComponent(true), delay);
    return () => clearTimeout(timer);
  }, [delayed, delay]);

  if (!showComponent) return null;

  return (
    <div
      className={cn(
        "w-full max-w-xs",
        centered &&
          "flex flex-col items-center justify-center h-[50vh] mx-auto",
        className
      )}
      {...props}
    >
      {!hideLabel && (
        <h3 className="text-lg font-semibold mb-2">
          {label ?? "Načítám data"}
        </h3>
      )}
      <div className="relative w-full h-2 bg-muted rounded overflow-hidden">
        <div className="absolute inset-0 animate-loading-bar bg-primary" />
      </div>
    </div>
  );
};
