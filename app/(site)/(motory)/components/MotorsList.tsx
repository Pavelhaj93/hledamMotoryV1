"use client";

import { Motor, OldMotor } from "@prisma/client";
import MotorCard from "./MotorCard";
import { Grid } from "@mui/material";
import { FC } from "react";
import Button from "@/components/Button";

export type SafeMotor = {
  id: string;
  markName: string;
  slug: string;
  name: string;
  description: string | null;
  price: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  images: string[];
};

interface MotorsListProps {
  data: SafeMotor[];
  variant: "repas" | "old";
}

const MotorsList: FC<MotorsListProps> = ({ data, variant }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl font-bold text-center mt-20">
          Omlouváme se ale momentálně nemáme žádné{" "}
          {variant === "repas" ? "repasované" : "staré"} motory skladem.
        </h2>
        {variant === "repas" ? (
          <>
            <h2 className="text-3xl font-bold text-center text-red-500">
              Zkuste nabídku naších starších motorů.
            </h2>
            <Button
              color="primary"
              className="w-72 mx-auto"
              onClick={() => (window.location.href = "/stare-motory")}
              arrow
            >
              Starší motory
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-red-500">
              Zkuste nabídku našich repasovaných motorů.
            </h2>
            <Button
              color="primary"
              className="w-72 mx-auto"
              onClick={() => (window.location.href = "/repasovane-motory")}
              arrow
            >
              Repasované motory
            </Button>
          </>
        )}
      </div>
    );
  }
  return (
    <Grid container spacing={3} className="mb-10">
      {data.map((motor) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={motor.id}>
            <MotorCard motor={motor} variant={variant} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MotorsList;
