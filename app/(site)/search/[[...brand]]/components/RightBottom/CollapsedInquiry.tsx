"use client";

import { RequestMotor, useRequestMotors } from "@/app/hooks/useRequestMotors";
import Button from "@/components/Button";

import { FC, useEffect, useState } from "react";
import CollapsedMotor from "./CollapsedMotor";

interface CollapsedInquiryProps {
  searchNext?: boolean;
  sendInquiry?: boolean;
}

const CollapsedInquiry: FC<CollapsedInquiryProps> = ({
  searchNext,
  sendInquiry,
}) => {
  const { requestMotors } = useRequestMotors();

  const [reqMotors, setReqMotors] = useState<RequestMotor[] | undefined>(
    undefined
  );

  useEffect(() => {
    setReqMotors(requestMotors);
  }, [requestMotors]);

  return (
    <div className="flex flex-col justify-between text-left">
      {reqMotors?.map((motor, index) => (
        <CollapsedMotor key={index} motor={motor} index={index} />
      ))}

      <div className="w-full flex flex-col items-center px-10 mt-5">
        {sendInquiry && (
          <Button
            color="primary"
            onClick={() => (window.location.href = "/inquiry")}
            className="mt-4 w-full"
            arrow
          >
            Odeslat poptávku
          </Button>
        )}
        {searchNext && (
          <Button
            color="secondary"
            className="w-full text-center"
            onClick={() => (window.location.href = "/search")}
            center
          >
            Vyhledat další
          </Button>
        )}
      </div>
    </div>
  );
};

export default CollapsedInquiry;
