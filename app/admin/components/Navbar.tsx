"use client";

import HamburgerMenu from "@/app/(site)/_components/HamburgerMenu";
import useClickOutside from "@/app/hooks/useClickOutside";
import Container from "@/components/container/Container";
import Image from "next/image";

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
  const { isOpen, toggleOpen, ref } = useClickOutside();

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
            priority
          />
        </a>
        <span className="flex flex-row gap-10 items-center z-10">
          <div ref={ref}>
            <HamburgerMenu
              menu={siteMenu}
              admin
              isOpen={isOpen}
              setIsOpen={toggleOpen}
            />
          </div>
        </span>
      </Container>
    </header>
  );
};

export default Navbar;
