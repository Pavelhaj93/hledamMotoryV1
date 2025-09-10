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
    <Card
      key={product.id}
      className="hover:shadow-lg transition-shadow flex flex-col"
    >
      <CardHeader className="p-0">
        <Link href={link} className="w-full">
          <Image
            // TODO: finish sizes
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[400px] items-center object-cover rounded-t-xl"
            width={300}
            height={400}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-xs">
            {getCategoryDisplayName(product.category ?? category ?? "")}
          </Badge>
          <Badge variant="default" className="text-xs">
            Skladem
          </Badge>
        </div>
        <CardTitle className="text-lg mb-2 uppercase">
          <Link href={link}>{product.name}</Link>
        </CardTitle>
        <p className="text-xl flex gap-2 items-center text-muted-foreground mb-3">
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
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description.substring(0, 100)}...
          </p>
        )}
        {product.price && (
          <p className="font-semibold text-accent text-3xl">
            Cena: {product.price.toLocaleString("CZ")} CZK
          </p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2 mt-auto">
        <Button asChild className="flex-1">
          <Link href={link}>Zobrazit detail</Link>
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href="/quote">Poptat</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCatalogCard;
