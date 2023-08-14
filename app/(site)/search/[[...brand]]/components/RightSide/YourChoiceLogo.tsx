import { marks } from "@/public/data/marks";
import Image from "next/image";
import React, { FC } from "react";

interface YourChoiceLogoProps {
  selectedItem: string;
  image?: boolean;
  title: string;
}

const YourChoiceLogo: FC<YourChoiceLogoProps> = ({
  selectedItem,
  image,
  title,
}) => {
  const getMarkId = (markName: string) => {
    const mark = marks.find((m) => m.name === markName);

    return mark?.id;
  };

  return (
    <>
      {image && (
        <Image
          src={`/images/frontend/cars/PNG/${getMarkId(selectedItem)}.png`}
          alt={`car brand logo of ${selectedItem}`}
          width={150}
          height={150}
        />
      )}
      <span className="font-bold">
        {title}: <span className="font-light">{selectedItem}</span>
      </span>
    </>
  );
};

export default YourChoiceLogo;
