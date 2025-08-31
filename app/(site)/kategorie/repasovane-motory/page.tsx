import prismaDB from "@/prisma/prismaDB";
import { CategoryPage } from "../../_components/sections/CategoryPage";
import { Motor } from "@prisma/client";
import { ProductVariant } from "@/types/products";

async function getRepasEngines() {
  const repasEngines = await prismaDB.motor.findMany();
  return repasEngines;
}

export default async function TurbochargersPage() {
  const products = await getRepasEngines();

  return (
    <CategoryPage
      category={ProductVariant.Repaired}
      title="Repasované Motory"
      description="Repasované motory pro maximální výkon"
      products={products as Motor[]}
    />
  );
}
