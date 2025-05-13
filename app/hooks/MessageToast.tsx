"use client";

import type React from "react";

import { forwardRef, useCallback, useState } from "react";
import { SnackbarContent, useSnackbar } from "notistack";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";

interface MessageToastProps {
  id: string | number;
  variant?: AlertVariant;
  message: string | React.ReactNode;
  description?: string | React.ReactNode;
  onInfoClick?: () => void;
}

const MessageToast = forwardRef<HTMLDivElement, MessageToastProps>(
  ({ id, variant = "default", message, description, onInfoClick }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((value) => !value);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    // Map variant to appropriate styling
    const getVariantStyles = (variant: AlertVariant) => {
      switch (variant) {
        case "destructive":
          return "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive";
        case "success":
          return "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-500";
        case "warning":
          return "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-500";
        case "info":
          return "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-500";
        default:
          return "";
      }
    };

    return (
      <SnackbarContent ref={ref}>
        <div className="w-full max-w-md">
          <Alert
            variant="default"
            className={cn(
              "relative w-full shadow-md",
              getVariantStyles(variant),
              expanded && "rounded-b-none border-b-0"
            )}
          >
            {typeof message === "string" ? (
              <AlertTitle>{message}</AlertTitle>
            ) : (
              message
            )}

            <div className="absolute top-2 right-2 flex items-center gap-1">
              {onInfoClick && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full"
                  onClick={onInfoClick}
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">More information</span>
                </Button>
              )}

              {description && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full"
                  onClick={handleExpandClick}
                >
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {expanded ? "Collapse" : "Expand"}
                  </span>
                </Button>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </Alert>

          {expanded && description && (
            <div
              className={cn(
                "w-full p-4 border border-t-0 rounded-b-md shadow-md bg-background",
                getVariantStyles(variant)
              )}
            >
              {typeof description === "string" ? (
                <AlertDescription>{description}</AlertDescription>
              ) : (
                description
              )}
            </div>
          )}
        </div>
      </SnackbarContent>
    );
  }
);

MessageToast.displayName = "MessageToast";

export default MessageToast;
