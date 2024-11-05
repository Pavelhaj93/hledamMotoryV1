import TopSection from "./_components/sections/TopSection";
import HowItWorksSection from "./_components/sections/HowItWorksSection";
import Benefits from "./_components/sections/Benefits";
import ContactSection from "./_components/sections/ContactSection";
import { Metadata } from "next";
import RepasSection from "./_components/sections/RepasSection";
import OldSection from "./_components/sections/OldSection";

export const metadata: Metadata = {
  title:
    "Motory | Repasované motory | Staré motory | Ojeté motory | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default function Page() {
  return (
    <>
      <RepasSection />
      <OldSection />
      <TopSection />
      <HowItWorksSection />
      <Benefits />
      <ContactSection />
    </>
  );
}
