import Container from "@/components/container/Container";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 h-16 items-center justify-center md:flex gap-1 text-gray-400 ">
      <Container className="flex flex-col lg:flex-row justify-center items-center">
        <span>@2022 - Hledám motory </span>
        <a
          className="hover:underline hover:text-red-500"
          href="www.pavelhajduch.cz"
        >
          - made by www.pavelhajduch.cz
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
