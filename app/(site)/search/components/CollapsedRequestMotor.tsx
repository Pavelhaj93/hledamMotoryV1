import { RequestMotor, useRequestMotors } from "@/app/hooks/useRequestMotors";
import clsx from "clsx";
import React, { FC, useState } from "react";

interface CollapsedInquiryProps {
  motor: RequestMotor;
  index: number;
}

const CollapsedRequestMotor: FC<CollapsedInquiryProps> = ({ motor, index }) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);

  const { handleDeleteMotor } = useRequestMotors();

  return (
    <>
      <div
        onClick={() => setOpenCollapse(!openCollapse)}
        className={clsx(
          "flex flex-row justify-between items-center cursor-pointer mt-5",
          "border-b-2"
        )}
      >
        <span className="mb-2 text-xl font-black">
          {motor.mark} / {motor.model}
        </span>
        <span
          className={clsx(
            "bg-[url('/images/frontend/big-caret.png')] h-3 w-6 bg-no-repeat transition duration-300 ease-in-out mr-3",
            openCollapse ? "transform rotate-180" : ""
          )}
        />
      </div>
      {openCollapse && (
        <div className="flex flex-col justify-between text-left">
          <div className="flex flex-row justify-between items-center cursor-pointer gap-10 mt-5">
            <span className="mb-2 font-bold text-lg">{motor.engineType}</span>
            <span
              onClick={handleDeleteMotor(index)}
              className={clsx(
                "bg-[url('/images/frontend/cross.png')] h-5 w-5 bg-no-repeat mr-3 text-red-500"
              )}
            />
          </div>
          <span className="font-medium text-lg text-gray-400">
            {motor.textArea}
          </span>
        </div>
      )}
    </>
  );
};

export default CollapsedRequestMotor;
