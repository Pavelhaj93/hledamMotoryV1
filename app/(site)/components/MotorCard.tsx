"use client";

import { Motor } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

interface MotorCardProps {
  motor: Motor;
}

const MotorCard: FC<MotorCardProps> = ({ motor }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={motor.image ?? "/images/placeholder.png"}
        alt={motor.name}
        width={300}
        height={600}
      />
      <div className="flex flex-col justify-center items-center">
        <div>{motor.name}</div>
        <div>
          <span>{motor.price}</span>
          <span> € s DPH</span>
        </div>
      </div>
    </div>
  );
};

export default MotorCard;
