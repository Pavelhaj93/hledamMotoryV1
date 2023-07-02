"use client";

import BrandImage from "./BrandImage";
import { brandImages } from "@/public/data/brandImages";

const BrandImagesList = () => {
  return (
    <div className="align-middle w-full pr-4 pt-8 gap-4 grid max-xl:grid-cols-2 max-xl:grid-rows-3 grid-cols-4 overflow-hidden">
      {brandImages.map((item) => (
        <BrandImage key={item.id} item={item} />
      ))}
    </div>
  );
};

export default BrandImagesList;
