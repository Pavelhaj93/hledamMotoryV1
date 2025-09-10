"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductCatalogCard from "./ProductCatalogCard";
import { ProductVariant } from "@/types/products";
import { Motor, MotorHead, OldMotor, Turbo } from "@prisma/client";

interface CategoryPageProps {
  category: ProductVariant;
  title: string;
  description: string;
  products: Array<Motor | MotorHead | OldMotor | Turbo>;
}

export function CategoryPage({
  category,
  title,
  description,
  products,
}: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  //   const categoryProducts = products.filter(
  //     (product) => product.category === category
  //   );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand =
      selectedBrand === "all" || product.markName === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const brands = Array.from(new Set(products.map((p) => p.markName)));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na domovskou stránku
        </Link>
      </Button>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-card p-6 rounded-lg border border-border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={`Hledat ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCatalogCard
            key={product.id}
            product={product}
            category={category}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Žádná {title.toLowerCase()} nenalezena odpovídající vašim kritériím.
          </p>
        </div>
      )}

      {/* Category Stats */}
      <div className="mt-12 bg-muted p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {products.length}
            </h3>
            <p className="text-muted-foreground">Celkem: {title}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {brands.length}
            </h3>
            <p className="text-muted-foreground">Dostupných značek</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {products.length}
            </h3>
            <p className="text-muted-foreground">Skladem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
