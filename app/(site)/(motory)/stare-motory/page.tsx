import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList from "../components/MotorsList";

export default async function StareMotoryPage() {
  const data = await prisma.oldMotor.findMany({});

  return (
    <>
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-between p-5">
          <h1 className="text-4xl font-bold text-center my-10">
            Starší motory
          </h1>
          <MotorsList data={data} variant="old" />
        </div>
      </Container>
    </>
  );
}
