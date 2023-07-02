import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";
import ContactForm from "../ContactForm";

const ContactSection = () => {
  return (
    <section className="pt-10 pb-15">
      <Container>
        <div className="flex flex-col w-full max-lg:text-center text-left mb-5">
          <h2 className="text-2xl font-semibold mb-1 text-red-500">
            Kontaktujte nás
          </h2>
          <h3 className="text-4xl font-black mb-1">
            Nejste si jisti nebo potřebujete poradit?
          </h3>
          <span className="text-xl mt-5 mb-7 max-lg:text-center text-left font-bold text-red-500">
            info@hledám-motory.cz
          </span>
        </div>
        <div className="flex max-lg:flex-col flex-row">
          <div className="max-lg:w-full w-1/2 flex flex-col">
            <h3 className="max-lg:text-center max-lg:mb-7 mb-9 mt-5 font-bold text-2xl">
              Kontaktní osoba
            </h3>
            <div className="flex max-lg:flex-col flex-row">
              <span className="mr-10 text-center max-lg:mx-auto">
                <Image
                  width={151}
                  height={151}
                  border-radius={50}
                  src="/images/frontend/demo/person-2.png"
                  alt="person-image-tomas-mihulka"
                />
              </span>
              <span className="max-lg:w-full max-lg:max-w-full max-lg:text-center max-lg:mt-7 text-left flex flex-col  max-w-xs">
                <h4 className="max-lg:text-2xl text-3xl mb-1 font-bold">
                  Tomáš Mihulka
                </h4>
                <span className="mb-7 text-xl">Founder</span>
                <p className="max-lg:text-base mt-30 italic leading-8">
                  „Mám na starosti především komunikaci s prodejci autodílů.
                  Neváhejte mě kontaktovat i pokud nějaký díl sháníte nebo vám
                  něco není jasné.“
                </p>
              </span>
            </div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
