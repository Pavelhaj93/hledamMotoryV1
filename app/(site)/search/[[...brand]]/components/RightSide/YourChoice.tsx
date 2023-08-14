"use client";

import React, { FC, useContext } from "react";

import InquiryRecapitulation from "../RightBottom/InquiryContainer";
import { InquiryContext } from "@/app/context/InquiryContext";
import MobileFooter from "./MobileFooter";
import YourChoiceLogo from "./YourChoiceLogo";

interface InquiryFooterProps {}

const InquiryFooter: FC<InquiryFooterProps> = () => {
  const { selectedMark, selectedModel, selectedEngineType } =
    useContext(InquiryContext);

  return (
    <>
      <MobileFooter />
      <div className="w-5/12 max-lg:hidden">
        <div className="shadow-2xl h-800 p-4 mx-5 mb-5 flex flex-col">
          <h2 className="text-4xl font-bold text-center">Váš výběr</h2>
          <div className="flex flex-col gap-2 justify-between h-full items-center">
            <div className="flex flex-col justify-center items-center h-1/3 border-b-2 w-10/12">
              {selectedMark && (
                <YourChoiceLogo
                  selectedItem={selectedMark}
                  title="Značka"
                  image
                />
              )}
            </div>
            <div className="flex flex-col justify-center items-center h-1/3 border-b-2 w-10/12">
              {selectedModel && (
                <YourChoiceLogo selectedItem={selectedModel} title="Model" />
              )}
            </div>
            <div className="flex flex-col justify-center items-center h-1/3 w-10/12">
              {selectedEngineType && (
                <YourChoiceLogo
                  selectedItem={selectedEngineType}
                  title="Motorizace"
                />
              )}
            </div>
          </div>
        </div>
        <InquiryRecapitulation sendInquiry />
      </div>
    </>
  );
};

export default InquiryFooter;
