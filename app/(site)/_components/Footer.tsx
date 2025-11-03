"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hledám motory</h3>
            <p className="text-sm opacity-90 mb-4">
              Váš důvěryhodný partner pro prémiové automobilové díly. Kvalita
              zaručena, výkon dodán.
            </p>
            <p className="text-sm opacity-90">
              Profesionální automobilová řešení od roku 1993
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Produkty</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kategorie/pouzite-motory"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Použité motory
                </Link>
              </li>
              <li>
                <Link
                  href="/kategorie/repasovane-motory"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Repasované motory
                </Link>
              </li>
              <li>
                <Link
                  href="/kategorie/turbodmychadla"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Turbodmychadla
                </Link>
              </li>
              {/* TODO: add when ready */}
              {/* <li>
                <Link
                  href="/prevodovky"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Převodovky
                </Link>
              </li> */}
              <li>
                <Link
                  href="/catalog"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Všechny produkty
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Podpora</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kontakt"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Kontaktujte nás
                </Link>
              </li>
              <li>
                <Link
                  href="/poptavka"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Poptávka
                </Link>
              </li>
              <li>
                <Link
                  href="/ochrana-osobnich-udaju"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Ochrana osobních údajů
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/shipping"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Shipping
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm opacity-90">
              <p>Telefon: +420 792 644 755</p>
              <p>Email: info@hledammotory.cz</p>
              <p>Pracovní doba: Po-Pá 8:00-18:00</p>
              {/* <p>Nouzové: 24/7 Podpora</p> */}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-90">
            <span>
              @{new Date().getFullYear()} Neuro s.r.o. | Hledám motory -
              Profesionální dodavatel autodílů{" "}
            </span>
            {/* TODO: made by pavel hajduch */}
          </p>
        </div>
      </div>
    </footer>
  );
};
