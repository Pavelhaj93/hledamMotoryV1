import Container from "@/components/container/Container";
import React from "react";

import InquiryForm from "./InquiryForm";
import InquiryRecapitulation from "../../search/components/InquiryRecapitulation";

const InquirySection = () => {
  return (
    <Container>
      <section className="h-56 justify-center items-center flex flex-col py-20 px-6">
        <h1 className="text-3xl font-black mb-5">Poptávka</h1>
        <p className="text-lg font-normal text-center">
          Vyplněním a odesláním formuláře připravíme poptávku pro prodejce dilů.
        </p>
      </section>
      <section className="flex flex-col lg:flex-row lg:gap-10">
        <InquiryForm />
        <InquiryRecapitulation searchNext />
      </section>
    </Container>
  );
};

export default InquirySection;
