import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { SnackbarProvider } from "notistack";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SnackbarProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </SnackbarProvider>
  );
};

export default layout;
