import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 h-16 items-center justify-center flex gap-1 text-gray-400 ">
      <span>@2022 - Hledám motory - made by </span>
      <a
        className="hover:underline hover:text-red-500"
        href="www.pavelhajduch.cz"
      >
        www.pavelhajduch.cz
      </a>
    </footer>
  );
};

export default Footer;
