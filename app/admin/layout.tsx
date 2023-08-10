import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | hledammotory.cz",
  description: "Admin",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layout;
