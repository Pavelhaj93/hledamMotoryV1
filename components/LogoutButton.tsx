"use client";

import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <div className="text-center">
      <Button color="secondary" center onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
