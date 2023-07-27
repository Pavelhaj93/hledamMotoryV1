"use client";

import { RequestMotor, useRequestMotors } from "@/app/hooks/useRequestMotors";
import Container from "@/components/container/Container";
import { useLocalStorageValue } from "@react-hookz/web";
import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

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

  const { value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");
  const [reqMotors, setReqMotors] = useState<
    RequestMotor | RequestMotor[] | undefined
  >(undefined);

  useEffect(() => {
    setReqMotors(requestMotors);
  }, [requestMotors]);

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

      <Container className="fixed right-0 left-0 top-0 flex justify-end px-0">
        <nav
          className={clsx(
            "opacity-1 w-645 z-20 bg-white pt-28 pr-28 pb-12 pl-12 transition-all duration-500 ease-in-out max-md:right-0 max-md:fixed max-md:w-full max-md:h-full max-md:pr-12",
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

          {reqMotors && (
            <span
              className={clsx(
                "block border-t-2 border-gray-100 border-opacity-80 py-9",
                imageSrc === "/images/frontend/icon-hamburger.png" && "hidden"
              )}
            >
              <a
                className="text-2xl font-black text-center block hover:underline"
                href="/inquiry"
              >
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
