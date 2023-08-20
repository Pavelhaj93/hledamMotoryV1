import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";

const Benefits = () => {
  return (
    <section className="w-full h-full overflow-hidden bg-[url('/images/frontend/benefitsBg.png')] bg-cover">
      <Container>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-1 text-red-500">
            Proč?
          </h2>
          <h3 className="text-4xl font-black text-center mb-10">
            Aplikace hledám díly?
          </h3>
        </div>
        <div className="flex max-lg:flex-col flex-row">
          <div className="flex flex-col justify-center items-center gap-6 mb-8">
            <Image
              width={117}
              height={110}
              src="/images/frontend/icon-benefits.png"
              alt="icon-benefits-piston"
            />
            <span className="text-xl mt-5 px-5 text-center font-bold">
              Ověření prodejci
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 mb-8">
            <Image
              width={117}
              height={110}
              src="/images/frontend/icon-benefits.png"
              alt="icon-benefits-piston"
            />
            <span className="text-xl mt-5 px-5 text-center font-bold">
              Největší databáze prodejců použítých autodílů
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 mb-8">
            <Image
              width={117}
              height={110}
              src="/images/frontend/icon-benefits.png"
              alt="icon-benefits-piston"
            />
            <span className="text-xl mt-5 px-5 text-center font-bold">
              Jednou poptávkou poptám všechny
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 mb-8">
            <Image
              width={117}
              height={110}
              src="/images/frontend/icon-benefits.png"
              alt="icon-benefits-piston"
            />
            <span className="text-xl mt-5 px-5 text-center font-bold">
              Lokalizace nejbližších prodejců
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
