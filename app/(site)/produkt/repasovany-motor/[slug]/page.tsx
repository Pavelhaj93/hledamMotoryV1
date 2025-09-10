import { notFound } from "next/navigation";

import prismaDB from "@/prisma/prismaDB";
import { ProductDetail } from "@/app/(site)/_components/sections/ProductDetail";
import { Motor } from "@prisma/client";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getProductById = async (slug: string) => {
  const repasEngine = await prismaDB?.motor.findUnique({
    where: { slug: slug },
  });

  return { repasEngine };
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProductById(params.slug);

  const repasEngine = product?.repasEngine as Motor;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetail product={repasEngine} category="Repasovaný motor" />
    </div>
  );
}
