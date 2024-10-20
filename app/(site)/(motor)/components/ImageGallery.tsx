"use client";

import { Motor } from "@prisma/client";
import Image from "next/image";
import React, { FC, useState } from "react";

interface ImageGalleryProps {
  motor: Motor;
}

const ImageGallery: FC<ImageGalleryProps> = ({ motor }) => {
  const [index, setIndex] = useState(0);

  // Navigate to the previous image
  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? motor.images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next image
  const goToNext = () => {
    setIndex((prevIndex) =>
      prevIndex === motor.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
      {/* Main Image Container */}
      <div className="relative w-full max-w-[384px] mx-auto">
        {/* Image */}
        <Image
          src={motor.images?.[index] ?? "/images/placeholder.png"}
          alt={motor.name}
          width={384}
          height={480}
          className="rounded-lg"
          loading="lazy"
          style={{
            objectFit: "cover", // Maintain aspect ratio, no cropping
            width: "100%",
            maxWidth: "384px",
            maxHeight: "480px",
          }}
          onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
        />
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-7xl text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Previous Image"
        >
          &#8249; {/* Left Arrow Symbol */}
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-7xl text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Next Image"
        >
          &#8250; {/* Right Arrow Symbol */}
        </button>
      </div>

      {/* Thumbnails with Flex Wrap */}
      <div className="mt-5 flex flex-wrap justify-start gap-4 max-w-sm">
        {motor.images.map((img, idx) => (
          <Image
            src={img}
            alt={`${motor.name} thumbnail ${idx + 1}`}
            width={80}
            height={100}
            className="cursor-pointer rounded-md transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-red-500"
            loading="lazy"
            style={{
              objectFit: "cover",
              opacity: idx === index ? 0.6 : 1, // Indicate the selected image
              border: idx === index ? "2px solid #EF4444" : "none",
            }}
            key={img}
            onClick={() => setIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIndex(idx);
              }
            }}
            tabIndex={0} // Make thumbnails focusable with keyboard
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
