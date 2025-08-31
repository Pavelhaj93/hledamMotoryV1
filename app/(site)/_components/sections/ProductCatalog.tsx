"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { FlattenedProduct } from "@/types/FlattenedProduct";
import ProductCatalogCard from "./ProductCatalogCard";
import { Motor, MotorHead, OldMotor } from "@prisma/client";

type Products = {
  engines?: Motor[];
  engineHeads?: MotorHead[];
  oldEngines?: OldMotor[];
}[];

const mapProductCategory = (category: string) => {
  switch (category) {
    case "Repasovaný motor":
      return "repasovany-motor";
    case "Motorová hlava":
      return "motorova-hlava";
    case "Turbodmychadlo":
      return "turbo";
    case "Převodovka":
      return "prevodovka";
    case "Použitý motor":
      return "pouzity-motor";
  }
};

export function ProductCatalog({ products }: { products: Products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const flattenedProducts: FlattenedProduct[] = products.flatMap(
    (productGroup) => {
      if (productGroup.engines) {
        return productGroup.engines.map((product) => ({
          ...product,
          category: "Repasovaný motor",
        }));
      }
      if (productGroup.engineHeads) {
        return productGroup.engineHeads.map((product) => ({
          ...product,
          category: "Motorová hlava",
        }));
      }
      if (productGroup.oldEngines) {
        return productGroup.oldEngines.map((product) => ({
          ...product,
          category: "Použitý motor",
        }));
      }
      return [];
    }
  );

  const filteredProducts = flattenedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.markName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "all" || product.markName === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const brands = Array.from(new Set(flattenedProducts.map((p) => p.markName)));

  return (
    <section id="catalog" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Náš katalog produktů
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prozkoumejte naši rozsáhlou kolekci prémiových automobilových dílů
            od předních výrobců
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-card p-6 rounded-lg border border-border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Zadejte název motoru, výrobce nebo popis"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny kategorie</SelectItem>
                <SelectItem value="engines">Repasované motory</SelectItem>
                <SelectItem value="engineHeads">Motorové hlavy</SelectItem>
                <SelectItem value="oldEngines">Použité motory</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny značky</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCatalogCard
              key={product.id}
              product={product}
              category={mapProductCategory(product.category as string)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenalezeny žádné produkty odpovídající vašemu vyhledávání.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
