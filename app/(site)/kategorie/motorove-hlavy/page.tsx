import prismaDB from "@/prisma/prismaDB";
import { CategoryPage } from "../../_components/sections/CategoryPage";
import { OldMotor } from "@prisma/client";
import { ProductVariant } from "@/types/products";

async function getEngineHeads() {
  const engineHeads = await prismaDB.motorHead.findMany();
  return engineHeads;
}

export default async function UsedEnginesPage() {
  const products = await getEngineHeads();

  return (
    <CategoryPage
      category={ProductVariant.EngineHeads}
      title="Motorové Hlavy"
      description="Kvalitní motorové hlavy pro váš motor"
      products={products as OldMotor[]}
    />
  );
}
