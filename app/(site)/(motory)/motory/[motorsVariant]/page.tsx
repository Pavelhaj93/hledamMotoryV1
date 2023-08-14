import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList, { SafeMotor } from "../../components/MotorsList";
import { Metadata } from "next";

type Props = {
  params: {
    motorsVariant: string;
  };
};

async function fetchMotors(params: Props["params"]) {
  let motor;

  if (params.motorsVariant === "stare-motory") {
    motor = await prisma.oldMotor.findMany();
  } else if (params.motorsVariant === "repasovane-motory") {
    motor = await prisma.motor.findMany();
  }

  return motor;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;

  return {
    title: `${params.motorsVariant} | hledammotory.cz`,
    description:
      "Hledáte starý motor? Nebo repasovaný motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
  };
};

export default async function StareMotoryPage({
  params,
}: {
  params: { motorsVariant: string };
}) {
  const data = await fetchMotors(params);

  return (
    <main>
      <Container>
        <div className="flex flex-col items-center justify-between p-5">
          <h1 className="text-4xl font-bold text-center my-10">
            {params.motorsVariant === "stare-motory"
              ? "Starší motory"
              : "Repasované motory"}
          </h1>
          <MotorsList data={data as SafeMotor[]} variant="old" />
        </div>
      </Container>
    </main>
  );
}
