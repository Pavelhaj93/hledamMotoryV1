"use client";

import { Metadata } from "next";
import AdminPage from "./containers/AdminPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminPageTop = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  return (
    <>
      <AdminPage />
    </>
  );
};

export default AdminPageTop;
