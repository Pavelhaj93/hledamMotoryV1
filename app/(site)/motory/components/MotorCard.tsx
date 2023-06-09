"use client";

import { Motor } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

interface MotorCardProps {
  motor: Motor;
  variant: "repas" | "old";
}

const MotorCard: FC<MotorCardProps> = ({ motor, variant }) => {
  return (
    <a href={`/motor/${variant}/${motor.id}`}>
      <div className="flex flex-col items-center cursor-pointer group">
        <Image
          src={motor.image ?? "/images/placeholder.png"}
          alt={motor.name}
          width={300}
          height={600}
        />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold text-red-500 uppercase group-hover:text-black">
            {motor.name}
          </h2>
          <div>
            <span className="text-2xl text-black font-bold">
              {motor.price} €
            </span>
            <span className="text-sm"> s DPH</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MotorCard;
