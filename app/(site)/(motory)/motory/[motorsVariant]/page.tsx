import React from "react";
import prisma from "@/app/libs/prismadb";
import { SafeMotor } from "../../components/MotorsList";
import { Metadata } from "next";
import MotorsContainer from "../../components/MotorsContainer";
import TopSection from "@/app/(site)/_components/sections/TopSection";
import ContactSection from "@/app/(site)/_components/sections/ContactSection";

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
}: Readonly<{
  params: { motorsVariant: string };
}>) {
  const data = await fetchMotors(params);

  return (
    <>
      <MotorsContainer params={params} data={data as SafeMotor[]} />;
      <TopSection />
      <ContactSection />
    </>
  );
}
