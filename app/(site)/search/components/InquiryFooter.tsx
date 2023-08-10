"use client";

import React, { FC, useContext, useEffect, useState } from "react";

import Button from "@/components/Button";
import InquiryLogo from "./InquiryLogo";
import InquiryRecapitulation from "./InquiryRecapitulation";
import { InquiryContext } from "@/app/context/InquiryContext";
import { RequestMotor } from "@/app/hooks/useRequestMotors";
import { useLocalStorageValue } from "@react-hookz/web";

interface InquiryFooterProps {}

const InquiryFooter: FC<InquiryFooterProps> = () => {
  const [reqMotors, setReqMotors] = useState<RequestMotor[] | undefined>(
    undefined
  );
  const { value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  useEffect(() => {
    setReqMotors(requestMotors);
  }, [requestMotors]);

  const { selectedMark, selectedModel, selectedEngineType } =
    useContext(InquiryContext);

  const getInquiryFooterAmount = (requestMotors: RequestMotor[]) => {
    const amount = requestMotors?.length;
    if (amount === 1) {
      return `Máte <b>${amount} motor </b>připraven k poptání`;
    }
    if (amount > 1 && amount < 5) {
      return `Máte <b>${amount} motory</b> připraveny k poptání`;
    }
    return `Máte <b>${amount} motorů</b> připraveno k poptání`;
  };

  const renderMobileFooter = () => {
    if (!reqMotors?.length) {
      return null;
    }

    return (
      <div className="max-lg:w-full max-lg:fixed left-0 bottom-0 h-32 bg-black bg-opacity-60 py-6 px-7 text-center flex flex-col justify-between items-center w-1/2 lg:hidden">
        <p
          className="text-xl text-white "
          dangerouslySetInnerHTML={{
            __html: getInquiryFooterAmount(reqMotors ? reqMotors : []),
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
    );
  };

  return (
    <>
      {renderMobileFooter()}
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
                <InquiryLogo
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
