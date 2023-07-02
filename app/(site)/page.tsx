import TopSection from "./components/sections/TopSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import Benefits from "./components/sections/Benefits";
import ContactSection from "./components/sections/ContactSection";

export default async function Home() {
  return (
    <>
      <TopSection />
      <HowItWorksSection />
      <Benefits />
      <ContactSection />
    </>
  );
}
