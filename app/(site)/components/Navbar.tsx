import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";

const siteMenu = [
  {
    title: "Domů",
    href: "/",
  },
  {
    title: "Hledat další motor",
    href: "/vyhledat",
  },
  {
    title: "Starší motory",
    href: "/motory/stare",
  },
  {
    title: "Repasované motory",
    href: "/motory/repasovane",
  },
  {
    title: "O nás a kontakt",
    href: "/o-nas-a-kontakt",
  },
];

const Navbar = () => {
  return (
    <header className="py-4 flex h-40">
      {/* <div className="w-screen bg-white z-20 h-40"> */}
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
          <a
            href="mailto:info@hledammotory.cz"
            className="max-md:hidden block text-xl font-bold"
          >
            <span className="flex flex-row gap-10 items-center">
              <Image
                src="/images/frontend/icon-bubble.png"
                alt="icon-bubble"
                width={45}
                height={37}
              />
              <span>info@hledammotory.cz</span>
            </span>
          </a>
          <HamburgerMenu menu={siteMenu} />
        </span>
      </Container>
      {/* </div> */}
    </header>
  );
};

export default Navbar;
