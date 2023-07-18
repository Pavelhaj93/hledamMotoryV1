"use client";

import { Motor, OldMotor } from "@prisma/client";
import MotorCard from "./MotorCard";
import { Grid } from "@mui/material";
import { FC } from "react";

interface MotorsListProps {
  data: Motor[] | OldMotor[];
  variant: "repas" | "old";
}

const MotorsList: FC<MotorsListProps> = ({ data, variant }) => {
  if (data.length === 0) {
    return (
      <h2 className="text-3xl font-bold text-center">
        Omlouváme se ale momentálně nemáme žádné motory skladem.
      </h2>
    );
  }
  return (
    <Grid container spacing={3}>
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
