import TopSection from "./components/sections/TopSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import Benefits from "./components/sections/Benefits";
import ContactSection from "./components/sections/ContactSection";
import { Metadata } from "next";
import RepasSection from "./components/sections/RepasSection";
import OldSection from "./components/sections/OldSection";

export const metadata: Metadata = {
  title:
    "Motory | Repasované motory | Staré motory | Ojeté motory | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default function Page() {
  return (
    <main>
      <RepasSection />
      <OldSection />
      <TopSection />
      <HowItWorksSection />
      <Benefits />
      <ContactSection />
    </main>
  );
}
