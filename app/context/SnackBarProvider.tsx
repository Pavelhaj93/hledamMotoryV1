"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};
