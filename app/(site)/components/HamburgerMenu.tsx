"use client";

import Container from "@/components/container/Container";
import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";

interface HamburgerMenuProps {
  menu: { title: string; href: string }[];
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ menu }) => {
  const [imageSrc, setImageSrc] = useState(
    "/images/frontend/icon-hamburger.png"
  );

  const handleImageChange = () => {
    if (imageSrc === "/images/frontend/icon-hamburger.png") {
      setImageSrc("/images/frontend/icon-cross.png");
    } else {
      setImageSrc("/images/frontend/icon-hamburger.png");
    }
  };

  const backup = false;

  return (
    <span className="flex flex-row gap-5 items-center z-10 max-sm:mr-5 cursor-pointer">
      <Image
        src={imageSrc}
        alt="icon-hamburger"
        width={34}
        height={28}
        className="z-30"
        onClick={handleImageChange}
      />
      <span className="text-xl font-bold max-sm:hidden z-30">Menu</span>

      <Container className="absolute top-0">
        <nav
          className={clsx(
            "opacity-1 block relative max-md:right-0 max-md:fixed right-3/4 max-md:pr-12 top-0 max-md:w-full w-645 max-md:h-full z-20 bg-white pt-28 pr-28 pb-12 pl-12 transition-all duration-500 ease-in-out",
            imageSrc === "/images/frontend/icon-hamburger.png" &&
              "opacity-0 h-0 hidden"
          )}
        >
          {menu.map(({ title, href }, index) => {
            return (
              <span
                key={index}
                className={clsx(
                  "block border-t-2 border-gray-100 border-opacity-80 py-9",
                  imageSrc === "/images/frontend/icon-hamburger.png" && "hidden"
                )}
              >
                <a
                  className="text-2xl font-black text-center block hover:underline"
                  href={href}
                >
                  {title}
                </a>
              </span>
            );
          })}
          {backup && (
            <span
              className={clsx(
                "block border-t-2 border-gray-100 border-opacity-80 py-9",
                imageSrc === "/images/frontend/icon-hamburger.png" && "hidden"
              )}
            >
              <a className="text-2xl font-black text-center block">
                Rekapitulace poptávky
              </a>
            </span>
          )}
        </nav>
      </Container>
    </span>
  );
};

export default HamburgerMenu;
