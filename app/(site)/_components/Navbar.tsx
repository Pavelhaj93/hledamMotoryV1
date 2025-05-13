"use client";

import Container from "@/components/container/Container";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import useClickOutside from "@/app/hooks/useClickOutside";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const siteMenu = [
  {
    title: "Domů",
    href: "/",
  },
  {
    title: "Poptat motor",
    href: "/search",
  },
  {
    title: "Starší motory",
    href: "/motory/stare-motory",
  },
  {
    title: "Repasované motory",
    href: "/motory/repasovane-motory",
  },
  {
    title: "Motorové hlavy",
    href: "/motory/motorove-hlavy",
  },
  {
    title: "O nás",
    href: "/about-us",
  },
  {
    title: "Kontakt",
    href: "/contact",
  },
];

const Navbar = () => {
  const { isOpen, toggleOpen, ref } = useClickOutside();

  return (
    <header className="py-2 flex h-24 shadow-xl fixed w-full z-20 bg-white top-0">
      {/* <div className="w-screen bg-white z-20 h-40"> */}
      <Container className="w-full flex flex-row justify-between items-center mx-auto z-20">
        <Link
          className="z-10 cursor-pointer hover:scale-90 transform transition-all duration-300"
          href="/"
        >
          <Image
            src="/images/HledamMotory-logo.png"
            alt="logo"
            width={180}
            height={78}
            priority
          />
        </Link>
        <span className="flex flex-row gap-10 items-center z-10">
          <span className="flex flex-row gap-2 items-center max-md:hidden text-xl font-bold">
            <Phone size={36} className=" stroke-red-500" />
            +420 724 704 764
          </span>
          <a
            href="mailto:info@hledammotory.cz"
            className="max-lg:hidden block text-xl font-bold"
          >
            <span className="flex flex-row gap-4 items-center">
              <Mail size={36} className="stroke-red-500" />
              <span>info@hledammotory.cz</span>
            </span>
          </a>
          <div ref={ref}>
            <HamburgerMenu
              menu={siteMenu}
              isOpen={isOpen}
              setIsOpen={toggleOpen}
            />
          </div>
        </span>
      </Container>
      {/* </div> */}
    </header>
  );
};

export default Navbar;
