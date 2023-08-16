"use client";

import { Motor } from "@prisma/client";
import Image from "next/image";
import React, { FC, useState } from "react";

interface ImageGalleryProps {
  motor: Motor;
}

const ImageGallery: FC<ImageGalleryProps> = ({ motor }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="w-5/12 max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
      <div className="h-480 w-96">
        <Image
          src={motor.images?.[index] ?? "/images/placeholder.png"}
          alt={motor.name}
          width={400}
          height={650}
        />
      </div>
      <div className="flex flex-row gap-5 mt-5">
        {motor.images.map((img, idx) => (
          <Image
            src={img}
            alt={motor.name}
            width={80}
            height={100}
            style={{ height: "auto", maxHeight: "100px" }}
            key={img}
            onMouseEnter={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
