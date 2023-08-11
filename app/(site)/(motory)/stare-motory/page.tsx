import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList from "../components/MotorsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staré motory | hledammotory.cz",
  description:
    "Hledáte starý motor? Nebo repasovaný motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default async function StareMotoryPage() {
  const data = await prisma.oldMotor.findMany();

  return (
    <main>
      <Container>
        <div className="flex flex-col items-center justify-between p-5">
          <h1 className="text-4xl font-bold text-center my-10">
            Starší motory
          </h1>
          <MotorsList data={data} variant="old" />
        </div>
      </Container>
    </main>
  );
}
