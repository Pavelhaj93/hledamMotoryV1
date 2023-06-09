import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList from "../components/MotorsList";

export default async function RepasovaneMotoryPage() {
  const data = await prisma.motor.findMany();

  return (
    <>
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-between p-5">
          <MotorsList data={data} variant="repas" />
        </div>
      </Container>
    </>
  );
}
