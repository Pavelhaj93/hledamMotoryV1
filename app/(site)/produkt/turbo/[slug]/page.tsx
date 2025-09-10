import { notFound } from "next/navigation";

import prismaDB from "@/prisma/prismaDB";
import { ProductDetail } from "@/app/(site)/_components/sections/ProductDetail";
import { Motor, Turbo } from "@prisma/client";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getProductById = async (slug: string) => {
  const turbo = await prismaDB?.turbo.findUnique({
    where: { slug: slug },
  });

  return { turbo };
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProductById(params.slug);

  const turbo = product?.turbo as Turbo;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetail product={turbo} category="Turbodmychadlo" />
    </div>
  );
}
