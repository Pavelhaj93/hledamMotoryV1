"use client";

import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <div className="text-center">
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
