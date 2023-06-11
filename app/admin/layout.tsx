import LogoutButton from "@/components/LogoutButton";
import React, { FC, ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-row justify-between px-24 py-3">
        <span>Admin Page</span>
        <span>
          <LogoutButton />
        </span>
      </div>
      {children}
    </>
  );
};

export default layout;
