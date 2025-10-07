import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { marks } from "@/public/data/marks";
import { FlattenedProduct } from "@/types/FlattenedProduct";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getCategoryDisplayName = (category: string) => {
  const categoryMap: Record<string, string> = {
    "repasovany-motor": "Repasované motory",
    "motorova-hlava": "Motorové hlavy",
    "pouzity-motor": "Použité motory",
  };
  return categoryMap[category] || category;
};

const ProductCatalogCard = ({
  product,
  category,
}: {
  product: FlattenedProduct;
  category?:
    | "pouzity-motor"
    | "repasovany-motor"
    | "motorova-hlava"
    | "prevodovka"
    | "turbo";
}) => {
  const link = `/produkt/${category}/${product.slug}`;
  return (
    <Link href={link}>
      <Card
        key={product.id}
        className="hover:shadow-lg transition-shadow flex flex-col h-full"
      >
        <CardHeader className="p-0">
          <Link href={link} className="w-full">
            <Image
              // TODO: finish sizes
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[413px] items-center object-cover rounded-t-xl"
              width={310}
              height={413}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 310px"
            />
          </Link>
        </CardHeader>
        <CardContent className="flex-col gap-1 flex h-full justify-between">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">
              {getCategoryDisplayName(product.category ?? category ?? "")}
            </Badge>
            <Badge variant="default">Skladem</Badge>
          </div>
          <CardTitle className="text-lg uppercase">{product.name}</CardTitle>
          <p className="text-xl flex gap-2 items-center">
            Výrobce:{" "}
            <Image
              src={`/images/frontend/cars/PNG/${marks
                .find((mark) => mark.name === product.markName)
                ?.id.toString()}.png`}
              alt={product.name}
              className="h-10 w-auto object-cover rounded-md"
              width={40}
              height={40}
            />
          </p>

          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description.substring(0, 100)}...
            </p>
          )}
          {product.price && (
            <p className="font-semibold text-accent text-2xl">
              Cena: {product.price.toLocaleString("cz")} Kč
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCatalogCard;
