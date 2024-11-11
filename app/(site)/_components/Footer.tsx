import Container from "@/components/container/Container";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 h-16 items-center justify-center md:flex gap-1 text-gray-400 ">
      <Container className="flex flex-col lg:flex-row justify-center items-center">
        <span>@{new Date().getFullYear()} - Hledám motory </span>
      </Container>
    </footer>
  );
};

export default Footer;
