import { notFound } from "next/navigation";
import prismaDB from "@/prisma/prismaDB";
import { ProductDetail } from "@/app/(site)/_components/sections/ProductDetail";
import { MotorHead } from "@prisma/client";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const getProductBySlug = async (slug: string) => {
  const engineHead = await prismaDB?.motorHead.findUnique({
    where: { slug: slug },
  });

  return { engineHead };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  const engineHead = product?.engineHead as MotorHead;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetail product={engineHead} category="Motorová hlava" />
    </div>
  );
}
