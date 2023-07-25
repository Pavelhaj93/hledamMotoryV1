"use client";

import clsx from "clsx";
import React, { FC, useState } from "react";
import CollapsedInquiry from "./CollapsedInquiry";

interface InquiryRecapitulationProps {
  searchNext?: boolean;
  sendInquiry?: boolean;
}

const InquiryRecapitulation: FC<InquiryRecapitulationProps> = ({
  searchNext,
  sendInquiry,
}) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);

  return (
    <div className="shadow-2xl h-auto p-4 mx-5 mb-5 flex flex-col max-md:mx-0">
      <div
        onClick={() => setOpenCollapse(!openCollapse)}
        className={clsx(
          "flex flex-row justify-between items-center cursor-pointer",
          openCollapse && "border-b-2"
        )}
      >
        <h2 className="text-2xl text-center font-extrabold py-5 pr-7 pl-3">
          Rekapitulace poptávky
        </h2>
        <span
          className={clsx(
            "bg-[url('/images/frontend/icon-arrowDown.png')] h-3 w-6 bg-no-repeat transition duration-300 ease-in-out mr-3",
            openCollapse ? "transform rotate-180" : ""
          )}
        />
      </div>
      {openCollapse && (
        <CollapsedInquiry searchNext={searchNext} sendInquiry={sendInquiry} />
      )}
    </div>
  );
};

export default InquiryRecapitulation;
