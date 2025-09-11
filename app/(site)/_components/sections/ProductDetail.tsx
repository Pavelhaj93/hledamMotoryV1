"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Shield, Truck, Phone } from "lucide-react";
import Link from "next/link";
import { Motor, MotorHead, Turbo } from "@prisma/client";
import { marks } from "@/public/data/marks";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductDetailProps {
  product: Motor | MotorHead | Turbo;
  category:
    | "Repasovaný motor"
    | "Motorová hlava"
    | "Použitý motor"
    | "Turbodmychadlo";
}

export function ProductDetail({ product, category }: ProductDetailProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  console.log("product", product.description);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/#catalog">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpátky do katalogu
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Badge variant="outline">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
              <Badge variant="default">Skladem</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 uppercase">
              {product.name}
            </h1>
            <p className="text-lg flex gap-2 items-center text-muted-foreground py-4">
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
            <p className="text-3xl mb-6">
              Cena:{" "}
              <span className="font-bold ">
                {product.price?.toLocaleString("CZ")} CZK
              </span>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Klíčové specifikace:</h3>
            <div className="w-full">
              {product?.description?.split("\n").map((line, index) => (
                <p className="text-md leading-loose" key={index}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => setShowInquiryForm(true)}
            >
              <Package className="w-4 h-4 mr-2" />
              Nezávazně poptat
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Package className="w-4 h-4 mr-2" />
              Check Availability
            </Button> */}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Záruka</p>
              <p className="text-xs text-muted-foreground">1 rok</p>
            </div>
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Rychlé doručení</p>
              <p className="text-xs text-muted-foreground">
                2-5 pracovních dní
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Podpora</p>
              <p className="text-xs text-muted-foreground">Odborná pomoc</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: maybe later */}
      {/* Detailed Information Tabs */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Part Number</h4>
                  <p className="text-muted-foreground font-mono">
                    {product.partNumber}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.detailedSpecs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-border"
                  >
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <div>
                <h4 className="font-semibold mb-4">Compatible Vehicles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.compatibility.map((vehicle, index) => (
                    <div key={index} className="flex items-center py-2">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      {vehicle}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Warranty Coverage</h4>
                  <p className="text-muted-foreground">{product.warranty}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">What's Covered</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Manufacturing defects</li>
                    <li>• Material failures under normal use</li>
                    <li>• Performance issues within specifications</li>
                    <li>• Free replacement or repair</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What's Not Covered</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Damage from improper installation</li>
                    <li>• Normal wear and tear</li>
                    <li>• Modifications or alterations</li>
                    <li>• Racing or competition use</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}

      {/* Inquiry Form Modal */}
      {/* {showInquiryForm && (
        <ProductInquiryForm
          product={product}
          onClose={() => setShowInquiryForm(false)}
        />
      )} */}
    </div>
  );
}
