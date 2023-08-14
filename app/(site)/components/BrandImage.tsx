"use client";

import { useSessionStorageValue } from "@react-hookz/web";
import Image from "next/image";
import React from "react";

const BrandImage = ({ item }: any) => {
  const { set } = useSessionStorageValue("brand");
  return (
    <a
      href={`/search/${item.name}`}
      key={item.id}
      onClick={() => set(item.name)}
      className="border-2 border-gray-300 h-28 items-center justify-center flex min-w-36 hover:border-red-500 cursor-pointer"
    >
      <Image src={item.src} alt={item.name} width={100} height={64} />
    </a>
  );
};

export default BrandImage;
