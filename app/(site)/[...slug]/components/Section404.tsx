import { Button } from "@/components/ui/button";
import Container from "@/components/container/Container";
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Section404 = () => {
  return (
    <Container>
      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-7xl font-bold text-red-500 uppercase ">404</h1>
        <h2 className="text-center">
          Omlouváme se ale tato stránka neexistuje.
        </h2>
        <Link href="/">
          <Button color="primary">
            Zpět na hlavní stránku
            <ChevronRight className="mr-2" />
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Section404;
