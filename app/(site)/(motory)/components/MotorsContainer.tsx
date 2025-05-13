import Container from "@/components/container/Container";
import React, { type FC } from "react";
import MotorsList, { type SafeMotor } from "./MotorsList";

interface MotorsContainerProps {
  params: {
    motorsVariant: string;
  };
  data: SafeMotor[];
}

const titleConfig: Record<string, string> = {
  "stare-motory": "Starší motory",
  "repasovane-motory": "Repasované motory",
  "motorove-hlavy": "Motorové hlavy",
};

const motorCardParamsConfig: Record<string, "old" | "repas" | "motorHead"> = {
  "stare-motory": "old",
  "repasovane-motory": "repas",
  "motorove-hlavy": "motorHead",
};

const MotorsContainer: FC<MotorsContainerProps> = ({ params, data }) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-between px-4 md:px-10 py-16 md:py-32">
        <h1 className="text-4xl font-bold text-center my-10">
          {titleConfig[params.motorsVariant] || "Motory"}
        </h1>
        <MotorsList
          data={data}
          variant={motorCardParamsConfig[params.motorsVariant]}
        />
      </div>
    </Container>
  );
};

export default MotorsContainer;
