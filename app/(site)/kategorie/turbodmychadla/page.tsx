import prismaDB from "@/prisma/prismaDB";
import { CategoryPage } from "../../_components/sections/CategoryPage";
import { Turbo } from "@prisma/client";
import { ProductVariant } from "@/types/products";

async function getTurboChargers() {
  const turbochargers = await prismaDB.turbo.findMany();
  return turbochargers;
}

export default async function TurbochargersPage() {
  const products = await getTurboChargers();

  return (
    <CategoryPage
      category={ProductVariant.Turbochargers}
      title="Turbodmychadla"
      description="Turbodmychadla pro maximální výkon. Možnosti s kuličkovými a kluznými ložisky od výrobců jako Garrett, BorgWarner a dalších prémiových značek."
      products={products as Turbo[]}
    />
  );
}
