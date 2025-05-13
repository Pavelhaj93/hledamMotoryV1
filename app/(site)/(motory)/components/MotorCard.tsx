"use client";

import { formatPrice } from "@/app/utils/utils";
import type { Motor } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";

interface MotorCardProps {
  motor: Motor;
  variant: "repas" | "old" | "motorHead";
}

const linkConfig = {
  repas: "repasovany-motor",
  old: "stary-motor",
  motorHead: "motorova-hlava",
};

const MotorCard: FC<MotorCardProps> = ({ motor, variant }) => {
  return (
    <Link href={`/${linkConfig[variant]}/${motor.slug}`}>
      <div className="flex flex-col items-center justify-between cursor-pointer group hover:scale-105 transition-all duration-300 ease-in-out h-full">
        <Image
          src={motor.images?.[0] ?? "/images/placeholder.png"}
          alt={motor.name}
          width={300}
          height={430}
          style={{
            maxHeight: "430px",
            width: "auto",
            minHeight: "430px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <div className="flex flex-col justify-center items-center mt-3">
          <h2 className="text-center text-lg font-semibold text-red-500 uppercase group-hover:text-black">
            {motor.name}
          </h2>
          <div>
            <span className="text-2xl text-black font-bold">
              {formatPrice(motor.price ?? 0)} CZK
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MotorCard;
