import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { IconCookie } from "@/icons";
import CookieBanner from "@/app/(site)/_components/CookieBanner/CookieBanner";

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
