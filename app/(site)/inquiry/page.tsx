import { Metadata } from "next";

import Container from "@/components/container/Container";
import InquiryForm from "./components/InquiryForm";
import InquiryRecapitulation from "../search/components/InquiryRecapitulation";

export const metadata: Metadata = {
  title: "Rekapitulace poptávky | hledammotory.cz",
  description: "Rekapitulace poptávky hledaných motorů na hledammotory.cz",
};

export default async function InquiryPage() {
  return (
    <main>
      <Container>
        <section className="h-56 justify-center items-center flex flex-col py-20 px-6">
          <h1 className="text-3xl font-black mb-5">Poptávka</h1>
          <p className="text-lg font-normal text-center">
            Vyplněním a odesláním formuláře připravíme poptávku pro prodejce
            dilů.
          </p>
        </section>
        <section className="flex flex-col lg:flex-row lg:gap-10">
          <InquiryForm />
          <InquiryRecapitulation searchNext />
        </section>
      </Container>
    </main>
  );
}
