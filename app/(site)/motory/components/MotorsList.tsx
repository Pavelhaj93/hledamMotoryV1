"use client";

import { Motor } from "@prisma/client";
import MotorCard from "./MotorCard";
import { Grid } from "@mui/material";
import { FC } from "react";

interface MotorsListProps {
  data: Motor[];
  variant: "repas" | "old";
}

const MotorsList: FC<MotorsListProps> = ({ data, variant }) => {
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
