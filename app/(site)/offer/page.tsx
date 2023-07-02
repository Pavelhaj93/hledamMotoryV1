import React from "react";

import HowItWorksSection from "./components/sections/HowItWorksSection";
import TopSection from "./components/sections/TopSection";
import Benefits from "./components/sections/Benefits";
import ContactSection from "./components/sections/ContactSection";

const page = () => {
  return (
    <>
      <TopSection />
      <HowItWorksSection />
      <Benefits />
      <ContactSection />
    </>
  );
};

export default page;
