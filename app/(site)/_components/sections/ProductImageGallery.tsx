"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square bg-card rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  // If only one image, show simple display
  if (images.length === 1) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square bg-card rounded-lg overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-card rounded-lg overflow-hidden group">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="secondary"
            size="icon"
            onClick={prevImage}
            className="bg-background/80 hover:bg-background/90 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className="bg-background/80 hover:bg-background/90 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-sm text-foreground">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={cn(
              "relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all duration-200",
              currentImageIndex === index
                ? "border-accent shadow-md"
                : "border-border hover:border-accent/50"
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
