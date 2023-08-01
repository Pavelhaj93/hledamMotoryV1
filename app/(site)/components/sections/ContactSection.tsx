import Container from "@/components/container/Container";
import React, { FC } from "react";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  title?: string;
  motorId?: string;
  motorName?: string;
}

const ContactSection: FC<ContactSectionProps> = ({
  title,
  motorId,
  motorName,
}) => {
  return (
    <section className="pt-10 pb-15">
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
          <div className="max-lg:w-full w-1/2 flex flex-col items-center justify-between gap-5 mt-5 h-1/2">
            <h3 className="text-center font-bold text-2xl mb-10">
              Zavolejte nám
            </h3>
            <span className="text-4xl font-bold text-red-500 mb-10">
              +420 725 825 199
            </span>
            <h3 className="text-center font-bold text-2xl mb-10">
              Napište nám na mail
            </h3>
            <a
              className="text-4xl font-bold text-red-500 mb-10 max-lg:text-2xl max-md-xl"
              href="mailto:info@hledammotory.cz"
            >
              info@hledammotory.cz
            </a>
            <span className="text-2xl mb-10">Se vším rádi poradíme</span>
          </div>
          <ContactForm motorId={motorId} motorName={motorName} />
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
