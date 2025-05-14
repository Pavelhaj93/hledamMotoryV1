"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <div className="text-center">
      <Button variant="secondary" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
