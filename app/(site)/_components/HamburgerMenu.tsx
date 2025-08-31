"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLocalStorageValue } from "@react-hookz/web";
import { Menu, X } from "lucide-react";
import type { RequestMotor } from "@/app/hooks/useRequestMotors";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  href: string;
}

interface HamburgerMenuProps {
  menu: MenuItem[];
  admin?: boolean;
  className?: string;
  animated?: boolean;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function HamburgerMenu({
  menu,
  admin = false,
  className,
  animated = true,
  isOpen,
  setIsOpen,
}: HamburgerMenuProps) {
  const { value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const mobileMenu = document.getElementById("mobile-menu");
      // if the target is not the menu or its children, close the menu
      if (
        mobileMenu &&
        !mobileMenu.contains(target) &&
        !target.closest(".hamburger-icon")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // add listener for esc key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    });
    // cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      });
    };
  }, [isOpen, setIsOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={cn("relative z-50", className)}>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        type="button"
        className="flex items-center gap-5 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {animated ? (
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className={cn("hamburger-icon", isOpen && "open")}>
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </div>
        ) : isOpen ? (
          <X size={28} className="z-30" />
        ) : (
          <Menu size={28} className="z-30" />
        )}
        <span className="text-xl font-bold max-sm:hidden">Menu</span>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-20" aria-hidden="true" />
      )}

      {/* Menu Content */}
      <div
        className={cn(
          "fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div
          id="mobile-menu"
          className="absolute right-0 top-0 h-full w-full md:w-[645px] bg-white pt-28 pr-28 pb-12 pl-12 max-md:pr-12 overflow-y-auto"
        >
          <button
            className="absolute top-10 right-10 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <X size={36} className="text-red-500" />
          </button>
          {/* close icon */}
          <nav className="space-y-0">
            {menu.map((item, index) => (
              <div
                key={index}
                className="border-t-2 border-gray-100 border-opacity-80 py-6"
              >
                <Link
                  href={item.href}
                  className="text-2xl font-black block hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </div>
            ))}

            {/* Conditional menu item for request motors */}
            {requestMotors?.length && requestMotors?.length > 0 && !admin && (
              <div className="border-t-2 border-gray-100 border-opacity-80 py-6">
                <Link
                  href="/inquiry"
                  className="text-2xl font-black block hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Rekapitulace poptávky
                </Link>
              </div>
            )}

            {/* Admin logout option */}
            {admin && (
              <div className="border-t-2 border-gray-100 border-opacity-80 py-6">
                <button
                  type="button"
                  className="text-2xl font-black block hover:underline text-left w-full"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Odhlásit se
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
