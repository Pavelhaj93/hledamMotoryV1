import Container from "@/components/container/Container";
import React, { FC } from "react";
import MotorsList, { SafeMotor } from "./MotorsList";

interface MotorsContainerProps {
  params: {
    motorsVariant: string;
  };
  data: SafeMotor[];
}

const MotorsContainer: FC<MotorsContainerProps> = ({ params, data }) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-between p-5">
        <h1 className="text-4xl font-bold text-center my-10">
          {params.motorsVariant === "stare-motory"
            ? "Starší motory"
            : "Repasované motory"}
        </h1>
        <MotorsList
          data={data}
          variant={params.motorsVariant === "stare-motory" ? "old" : "repas"}
        />
      </div>
    </Container>
  );
};

export default MotorsContainer;
