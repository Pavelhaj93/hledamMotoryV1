import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList from "../components/MotorsList";

export default async function RepasovaneMotoryPage() {
  const data = await prisma.motor.findMany();

  return (
    <>
      <Container>
        <div className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold text-center my-10">
            Repasované motory
          </h1>
          <MotorsList data={data} variant="repas" />
        </div>
      </Container>
    </>
  );
}
