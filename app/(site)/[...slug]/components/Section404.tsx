import Button from "@/components/Button";
import Container from "@/components/container/Container";
import React from "react";

const Section404 = () => {
  return (
    <Container>
      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-7xl font-bold text-red-500 uppercase ">404</h1>
        <h2 className="text-center">
          Omlouváme se ale tato stránka neexistuje.
        </h2>
        <a href="/">
          <Button color="primary" fullWidth arrow>
            Zpět na hlavní stránku
          </Button>
        </a>
      </div>
    </Container>
  );
};

export default Section404;
