"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "35px",
      fontWeight: 900,
    },
    h2: {
      fontSize: "30px",
      fontWeight: 900,
    },
    h3: {
      fontSize: "25px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "16px",
      fontWeight: 400,
    },
  },
});
export const MaterialThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
