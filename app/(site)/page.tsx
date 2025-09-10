import HowItWorksSection from "./_components/sections/HowItWorksSection";
import Benefits from "./_components/sections/Benefits";
import ContactSection from "./_components/sections/ContactSection";
import type { Metadata } from "next";
import prismaDB from "@/prisma/prismaDB";
import { ProductCatalog } from "./_components/sections/ProductCatalog";
import { Hero } from "./_components/sections/Hero";

async function getAllProducts() {
  const engines = await prismaDB?.motor.findMany();
  const engineHeads = await prismaDB?.motorHead?.findMany();
  const oldEngines = await prismaDB?.oldMotor?.findMany();

  //   TODO: addd turbo chargers
  //   const turbochargers = prisma?.turbocharger?.findMany()

  return [
    { engines: engines },
    { engineHeads: engineHeads },
    { oldEngines: oldEngines },
  ];
}

export const metadata: Metadata = {
  title:
    "Motory | Repasované motory | Staré motory | Ojeté motory | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default async function Page() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <ProductCatalog products={products} />
      <HowItWorksSection />
      <Benefits />
      <ContactSection />
    </>
  );
}
