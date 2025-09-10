import { notFound } from "next/navigation";

import prismaDB from "@/prisma/prismaDB";
import { OldMotor } from "@prisma/client";
import { ProductDetail } from "@/app/(site)/_components/sections/ProductDetail";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getProductBySlug = async (slug: string) => {
  const usedEngine = await prismaDB?.oldMotor.findUnique({
    where: { slug },
  });

  return { usedEngine };
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  const usedEngine = product?.usedEngine as OldMotor;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetail product={usedEngine} category="Použitý motor" />
    </div>
  );
}
