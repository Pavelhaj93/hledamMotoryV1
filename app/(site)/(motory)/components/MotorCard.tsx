"use client";

import { formatPrice } from "@/app/utils/utils";
import { Motor } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

interface MotorCardProps {
  motor: Motor;
  variant: "repas" | "old";
}

const MotorCard: FC<MotorCardProps> = ({ motor, variant }) => {
  return (
    <a
      href={`/${variant === "repas" ? "repasovany-motor" : "stary-motor"}/${
        motor.slug
      }`}
    >
      <div className="flex flex-col items-center justify-between cursor-pointer group hover:scale-105 transition-all duration-300 ease-in-out h-full">
        <Image
          src={motor.images?.[0] ?? "/images/placeholder.png"}
          alt={motor.name}
          width={300}
          height={430}
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
    </a>
  );
};

export default MotorCard;
