import Container from "@/components/container/Container";
import React, { type FC } from "react";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  title?: string;
  motorId?: string;
  motorName?: string;
  motorSlug?: string;
  motorVariant?: string;
  className?: string;
}

const ContactSection: FC<ContactSectionProps> = ({
  title,
  motorId,
  motorName,
  motorSlug,
  motorVariant,
  className,
}) => {
  return (
    <section className={`pt-10 pb-15 ${className}`}>
      <Container>
        <div className="flex flex-col w-full max-lg:text-center text-left mb-5">
          <h2 className="text-2xl font-semibold mb-1 text-red-500">
            Kontaktujte nás
          </h2>
          <h3 className="text-4xl font-black mb-1">
            {title ?? "Nejste si jisti nebo potřebujete poradit?"}
          </h3>
        </div>
        <div className="flex max-lg:flex-col flex-row">
          <div className="max-lg:w-full w-1/2 flex flex-col justify-between gap-10">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-center font-bold text-2xl mb-7 xl:mb-9 mt-5">
                Zavolejte nám
              </h3>
              <div className="flex flex-col items-center gap-4">
                <span className="text-4xl font-bold text-red-500">
                  +420 724 704 764
                </span>
                <h3 className="text-center font-bold text-2xl">
                  Napište nám na mail
                </h3>
                <a
                  className="text-4xl font-bold text-red-500 max-lg:text-2xl max-md-xl"
                  href="mailto:info@hledammotory.cz"
                >
                  info@hledammotory.cz
                </a>
                <span className="text-2xl ">Se vším rádi poradíme</span>
              </div>
            </div>
            <div className="text-center flex flex-col gap-6 mb-10">
              <h3 className="font-bold text-2xl">Firemní údaje</h3>
              <div className="flex flex-col text-gray-800 gap-2">
                <p className="text-lg">NEURO s.r.o,</p>
                <p className="text-lg">Prachnerova 642/10,</p>
                <p className="text-lg">Praha 5 150 00</p>
                <p className="text-lg">DIČ: CZ19679041</p>
              </div>
            </div>
          </div>
          <ContactForm
            motorId={motorId}
            motorName={motorName}
            motorSlug={motorSlug}
            motorVariant={motorVariant}
          />
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
