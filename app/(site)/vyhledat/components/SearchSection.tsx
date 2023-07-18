import Container from "@/components/container/Container";
import React, { FC } from "react";
import SelectorsWrap from "./SelectorsWrap";

interface SearchSectionProps {}

const SearchSection = () => {
  return (
    <section className="min-h-screen">
      <Container>
        <div className="flex flex-col w-full items-center">
          <h1 className="mb-5 text-center text-4xl max-lg:text-red-500 text-black font-black">
            Začít hledat motor
          </h1>
          <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full">
              {/* parts wrap */}
              <SelectorsWrap />
            </div>
            {/* <div className="hidden">Schovany selected box</div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchSection;
