"use client";

import { useLocalStorageValue } from "@react-hookz/web";
import React, { FC, useEffect, useState } from "react";
import { RequestMotor } from "./SelectorsWrap";
import Button from "@/components/Button";
import InquiryLogo from "./InquiryLogo";

interface InquiryFooterProps {
  selectedMark: string | null;
  selectedModel: string | null;
  selectedEngineType: string | null;
}

const InquiryFooter: FC<InquiryFooterProps> = ({
  selectedMark,
  selectedModel,
  selectedEngineType,
}) => {
  const [requestMotors, setRequestMotors] = useState<
    RequestMotor[] | undefined
  >(undefined);

  const { value: reqMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  useEffect(() => {
    setRequestMotors(reqMotors);
  }, [reqMotors]);

  

  const getInquiryFooterAmount = (requestMotors: RequestMotor[]) => {
    const amount = requestMotors.length;
    if (amount === 1) {
      return `Máte <b>${amount} motor </b>připraven k poptání`;
    }
    if (amount > 1 && amount < 5) {
      return `Máte <b>${amount} motory</b> připraveny k poptání`;
    }
    return `Míte <b>${amount} motorů</b> připraveno k poptání`;
  };

  {
    console.log(selectedMark);
  }

  if (!requestMotors) return null;

  return (
    <>
      <div className="max-lg:w-full max-lg:fixed bottom-0 h-32 bg-black bg-opacity-60 py-6 px-7 text-center flex flex-col justify-between items-center w-1/2 lg:hidden">
        <p
          className="text-xl text-white "
          dangerouslySetInnerHTML={{
            __html: getInquiryFooterAmount(requestMotors),
          }}
        />
        <div className="w-1/2 justify-center items-center flex flex-col">
          <Button
            color="primary"
            onClick={() => (window.location.href = "/inquiry")}
            className="mt-2 mb-0"
            arrow
          >
            Poptat motory
          </Button>
        </div>
      </div>
      <div className="w-5/12 max-lg:hidden">
        <div className="shadow-2xl h-800 p-4 mx-5 mb-5 flex flex-col">
          <h2 className="text-4xl font-bold text-center">Váš výběr</h2>
          <div className="flex flex-col gap-2 justify-between h-full items-center">
            <div className="flex flex-col justify-center items-center h-1/3 border-b-2 w-10/12">
              {selectedMark && (
               <InquiryLogo selectedItem={selectedMark} title="Značka" image />
              )}
            </div>
            <div className="flex flex-col justify-center items-center h-1/3 border-b-2 w-10/12">
            {selectedModel && (
               <InquiryLogo selectedItem={selectedModel} title="Model" />
              )}
            </div>
            <div className="flex flex-col justify-center items-center h-1/3 w-10/12">
            {selectedEngineType && (
               <InquiryLogo selectedItem={selectedEngineType} title="Motorizace" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryFooter;
