import React, { type ReactNode } from "react";
import Navbar from "./_components/Navbar";
import CookieBanner from "@/app/(site)/_components/CookieBanner/CookieBanner";
import { Footer } from "./_components/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <CookieBanner />
      <Footer />
    </>
  );
};

export default layout;
