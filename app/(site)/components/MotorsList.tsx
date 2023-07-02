"use client";

import Loading from "@/components/loading/Loading";
import { Motor } from "@prisma/client";
import axios from "axios";
import MotorCard from "./MotorCard";
import { Alert, Grid } from "@mui/material";

const MotorsList = ({ data }: { data: Motor[] }) => {
  return (
    <Grid container spacing={3}>
      {data.map((motor) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={motor.id}>
            <MotorCard motor={motor} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MotorsList;
