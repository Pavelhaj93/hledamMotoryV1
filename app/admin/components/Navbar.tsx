"use client";

import HamburgerMenu from "@/app/(site)/components/HamburgerMenu";
import Container from "@/components/container/Container";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const siteMenu = [
  {
    title: "Repasované motory",
    href: "/admin/repas",
  },
  {
    title: "Starší motory",
    href: "/admin/old",
  },
  {
    title: "Zpět na HledamMotory.cz",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <header className="py-4 flex h-40">
      <Container className="w-full h-24 flex flex-row justify-between items-center mx-auto z-20">
        <a
          className="z-10 cursor-pointer hover:scale-90 transform transition-all duration-300"
          href="/"
        >
          <Image
            src="/images/HledamMotory-logo.png"
            alt="logo"
            width={180}
            height={78}
          />
        </a>
        <span className="flex flex-row gap-10 items-center z-10">
          <HamburgerMenu menu={siteMenu} admin />
        </span>
      </Container>
    </header>
  );
};

export default Navbar;
