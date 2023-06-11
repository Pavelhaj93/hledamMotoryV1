"use client";

import React from "react";

const Navbar = () => {
  return (
    <div className="w-full border-l-purple-600 border-2 h-24 px-3 flex flex-row justify-between items-center">
      <span>HledamMotory</span>
      <span className="flex flex-row gap-10">
        <span>info@hledam-motory.cz</span>
        <span>Menu</span>
      </span>
    </div>
  );
};

export default Navbar;
