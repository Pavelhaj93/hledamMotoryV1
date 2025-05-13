import type { RequestMotor } from "@/app/hooks/useRequestMotors";
import { getInquiryFooterAmount } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import { useLocalStorageValue } from "@react-hookz/web";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const MobileFooter = () => {
  const [reqMotors, setReqMotors] = useState<RequestMotor[] | undefined>(
    undefined
  );
  const { value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  useEffect(() => {
    setReqMotors(requestMotors);
  }, [requestMotors]);

  if (!reqMotors?.length) {
    return null;
  }

  return (
    <div className="max-lg:w-full max-lg:fixed left-0 bottom-0 h-32 bg-black bg-opacity-60 py-6 px-7 text-center flex flex-col justify-between items-center w-1/2 lg:hidden">
      <p
        className="text-xl text-white"
        dangerouslySetInnerHTML={{
          __html: getInquiryFooterAmount(reqMotors ?? []),
        }}
      />
      <div className="w-1/2 justify-center items-center flex flex-col">
        <Button
          color="primary"
          onClick={() => (window.location.href = "/inquiry")}
          className="mt-2 mb-0"
        >
          Poptat motory
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MobileFooter;
