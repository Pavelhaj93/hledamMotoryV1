import React from "react";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import MotorsList from "../components/MotorsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repasované motory | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

async function fetchMotors() {
  const res = await fetch("/api/motors/repas");

  if (!res.ok) {
    throw new Error("Failed to fetch motors");
  }

  return res.json();
}

export default async function RepasovaneMotoryPage() {
  const data = await fetchMotors();

  return (
    <main>
      <Container>
        <div className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold text-center my-10">
            Repasované motory
          </h1>
          <MotorsList data={data} variant="repas" />
        </div>
      </Container>
    </main>
  );
}
