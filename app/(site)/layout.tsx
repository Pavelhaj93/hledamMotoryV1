import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
