"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import type { FlattenedProduct } from "@/types/FlattenedProduct";
import ProductCatalogCard from "./ProductCatalogCard";
import type { Motor, MotorHead, OldMotor, Turbo } from "@prisma/client";

type Products = {
  engines?: Motor[];
  engineHeads?: MotorHead[];
  oldEngines?: OldMotor[];
  turbos?: Turbo[];
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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // 3x3 grid

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
      if (productGroup.turbos) {
        return productGroup.turbos.map((product) => ({
          ...product,
          category: "Turbodmychadlo",
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

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand]);

  const brands = Array.from(new Set(flattenedProducts.map((p) => p.markName)));

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter(
      (item, index, arr) =>
        (arr.indexOf(item) === index && item !== 1) || index === 0
    );
  };

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
                <SelectItem value="Repasovaný motor">
                  Repasované motory
                </SelectItem>
                <SelectItem value="Motorová hlava">Motorové hlavy</SelectItem>
                <SelectItem value="Použitý motor">Použité motory</SelectItem>
                <SelectItem value="Turbodmychadlo">Turbodmychadla</SelectItem>
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

          {filteredProducts.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Zobrazuje se {startIndex + 1}-
              {Math.min(endIndex, filteredProducts.length)} z{" "}
              {filteredProducts.length} produktů
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
          {currentProducts.map((product) => (
            <ProductCatalogCard
              key={product.id}
              product={product}
              category={mapProductCategory(product.category as string)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Předchozí
            </Button>

            <div className="flex items-center gap-1">
              {getVisiblePages().map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page as number)}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Další
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

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
