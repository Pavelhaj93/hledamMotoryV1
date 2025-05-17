import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | hledammotory.cz",
  description: "Admin",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AdminLayout;
