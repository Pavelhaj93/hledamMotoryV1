import Container from "@/components/container/Container";
import React from "react";

const Footer = () => {
  return (
    <footer className="block  bg-slate-50">
      <Container className="h-24 pt-7 pb-4 text-center flex flex-col gap-1 text-gray-400 ">
        <span>
          @{" "}
          <span
            dangerouslySetInnerHTML={{ __html: new Date().getFullYear() }}
          />{" "}
          Hledám motory
        </span>
        <span>
          Made by{" "}
          <a
            className="hover:underline hover:text-red-500"
            href="www.pavelhajduch.cz"
          >
            www.pavelhajduch.cz
          </a>
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
