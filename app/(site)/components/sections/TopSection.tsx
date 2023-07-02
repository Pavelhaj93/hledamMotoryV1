import Container from "@/components/container/Container";

import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import BrandImagesList from "../BrandImagesList";

const TopSection = () => {
  return (
    <section className="flex-wrap pt-40 h-full bg-[url('/images/frontend/background.png')] bg-cover relative -top-40 overflow-hidden z-10">
      <Container className="flex flex-col w-full lg:flex-row">
        <div className="inline-block align-middle w-full h-full pr-4 pt-12 lg:w-full max-lg:flex flex-col items-center">
          <h2 className="text-2xl font-black text-red-500 w-7/12 max-lg:text-center lg:w-full lg:text-4xl">
            Hledáte motor a nenašli jste ho v naší nabídce?
          </h2>
          <h2 className="lg:text-3xl mt-9 font-normal mb-15 max-lg:text-lg max-lg:mt-4 max-lg:text-center">
            Pošlete nám přes vyhledávač poptávku motoru, který hledáte a my se
            Vám ozveme.
          </h2>
          <BrandImagesList />
          <div className="flex flex-col gap-10 w-full items-center mt-10">
            <a
              href="/search"
              className="underline decoration-red-500 decoration-2 underline-offset-8"
            >
              <strong className="text-red-500 font-black text-3xl">
                Další
              </strong>
              <span className="text-2xl"> značky</span>
            </a>

            <Button color="primary" arrow>
              <a href="/vyhledat">Hledat motor</a>
            </Button>
          </div>
        </div>
        <div className="max-lg:w-full inline-block align-middle w-4/12 h-full px-6 pt-12 mt-20">
          <div className="max-lg:w-full max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-center relative w-screen h-full">
            <div className="max-lg:w-full relative top-0 h-full w-screen mt-12">
              <Image
                src="/images/frontend/pattern.png"
                alt="pattern background"
                width={1200}
                height={400}
              />
            </div>
            <div className="max-lg:w-8/12  absolute w-1/3 top-0 h-full">
              <Image
                className="mt-20 max-lg:mt-0"
                src="/images/frontend/partsImage.png"
                alt="motor parts"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopSection;
