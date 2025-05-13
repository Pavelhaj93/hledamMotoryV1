"use client";

import { IconCookie } from "@/icons";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

interface ConsentHandler {
  (consent: boolean): void;
}

export default function CookieBanner() {
  const [openBanner, setOpenBanner] = useState(false);

  useEffect(() => {
    const consentCookie = Cookies.get("consent");
    if (consentCookie === undefined) {
      setOpenBanner(true);
    } else {
      return;
    }
  }, []);

  const handleConsent: ConsentHandler = (consent: boolean) => {
    Cookies.set("consent", consent ? "1" : "0", { expires: 365 });
    setOpenBanner(false);
  };

  return (
    <div>
      <div className="group fixed bottom-4 left-4 flex items-center">
        <IconCookie
          size={12}
          aria-label="Spravovat souhlas s nastavením osobních údajů"
          className="text-white transition-colors bg-red-500 hover:bg-red-600 rounded-full p-2 cursor-pointer"
          onClick={() => setOpenBanner(!openBanner)}
        />
        {!openBanner && (
          <span className="hidden group-hover:inline-block ml-2 text-white">
            Spravovat souhlas s nastavením osobních údajů
          </span>
        )}
      </div>

      {openBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-3xl border-t p-4 md:p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-sm md:text-base text-center md:text-left">
            Tato stránka a Seznam.cz používá soubory cookie pro sledování
            konverzí a personalizované reklamy. Souhlasíte s tím?
            <Link
              href="/pravidla-cookies"
              className="ml-2 text-sm md:text-base underline hover:no-underline hover:text-gray-500 transition-colors"
            >
              Podrobnosti o zpracování souborů cookies
            </Link>
          </p>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleConsent(true)}
              className="bg-red-500 hover:bg-red-600 transition-colors text-white text-sm md:text-base px-3 py-2 rounded"
            >
              Přijmout
            </button>
            <button
              type="button"
              onClick={() => handleConsent(false)}
              className="bg-gray-600 hover:bg-gray-500 transition-colors text-white text-sm px-3 py-2 rounded"
            >
              Odmítnout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
