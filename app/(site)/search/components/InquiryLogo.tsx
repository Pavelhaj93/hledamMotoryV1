import { marks } from "@/public/data/marks";
import Image from "next/image";
import React, { FC } from "react";

interface InquiryLogoProps {
  selectedItem: string;
  image?: boolean
  title: string
}

const InquiryLogo: FC<InquiryLogoProps> = ({ selectedItem, image, title }) => {
  const getMarkId = (markName: string) => {
    const mark = marks.find((m) => m.name === markName);
    return mark?.id;
  };

  return (
    <>
      {image &&<Image
        src={`/images/frontend/cars/PNG/${getMarkId(selectedItem)}.png?v=1`}
        alt={`car brand logo of ${selectedItem}`}
        width={150}
        height={150}
      />}
      <span className="font-bold">{title}: <span className="font-light">{selectedItem}</span></span>
    </>
  );
};

export default InquiryLogo;
