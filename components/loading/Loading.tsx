"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

export interface LoadingProps extends LinearProgressProps {
  centered?: boolean;

  delayed?: boolean;

  /**
   * The time of a delay
   *
   * @default 700ms
   */
  delay?: number;

  hideLabel?: boolean;

  label?: string;
}

const Loading: React.FC<LoadingProps> = ({
  centered,
  delayed,
  delay = 700,
  label,
  hideLabel,
  ...other
}) => {
  const [showComponent, setShowComponent] = useState(!delayed);

  useEffect(() => {
    const timer = setTimeout(() => setShowComponent(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showComponent ? (
    <Box
      sx={
        centered
          ? {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flex: "1 1 auto",
              height: "50vh",
            }
          : { maxWidth: 200, textAlign: "center" }
      }
    >
      {!hideLabel && (
        <Typography variant="h3">{label ?? "Načítám data"}</Typography>
      )}

      <Box
        sx={{
          display: "flex",
          position: "relative",
          margin: centered ? "8px auto" : undefined,
          width: "100%",
          maxWidth: 200,
        }}
      >
        <LinearProgress
          {...other}
          sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
        />
      </Box>
    </Box>
  ) : null;
};

export default Loading;
