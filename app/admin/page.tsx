"use client";

import { SnackbarProvider } from "notistack";
import AdminPage from "./containers/AdminPage";

const page = () => {
  return (
    <>
      <SnackbarProvider>
        <AdminPage />
      </SnackbarProvider>
    </>
  );
};

export default page;
