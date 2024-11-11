"use client";

import Container from "@/components/container/Container";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import useClickOutside from "@/app/hooks/useClickOutside";
import Link from "next/link";

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
    <header className="py-2 flex h-28 shadow-xl sticky z-20 bg-white top-0">
      {/* <div className="w-screen bg-white z-20 h-40"> */}
      <Container className="w-full h-24 flex flex-row justify-between items-center mx-auto z-20">
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
          <div ref={ref}>
            <HamburgerMenu
              menu={siteMenu}
              isOpen={isOpen}
              handleMenuOpen={toggleOpen}
            />
          </div>
        </span>
      </Container>
      {/* </div> */}
    </header>
  );
};

export default Navbar;
