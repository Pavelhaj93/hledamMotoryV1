import prismaDB from "@/prisma/prismaDB";
import { CategoryPage } from "../../_components/sections/CategoryPage";
import { OldMotor } from "@prisma/client";
import { ProductVariant } from "@/types/products";

async function getUsedEngines() {
  const usedEngines = await prismaDB.oldMotor.findMany();
  return usedEngines;
}

export default async function UsedEnginesPage() {
  const products = await getUsedEngines();

  return (
    <CategoryPage
      category={ProductVariant.Old}
      title="Použité Motory"
      description="Použité motory pro maximální výkon"
      products={products as OldMotor[]}
    />
  );
}
