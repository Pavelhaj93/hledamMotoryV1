import Container from "@/components/container/Container";
import Image from "next/image";
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
          <span className="text-xl mt-5 mb-7 max-lg:text-center text-left font-bold text-red-500">
            info@hledám-motory.cz
          </span>
        </div>
        <div className="flex max-lg:flex-col flex-row">
          <div className="max-lg:w-full w-1/2 flex flex-col items-center gap-10 mt-5">
            <h3 className="text-center font-bold text-2xl mb-20">
              Zavolejte nám
            </h3>
            <span className="text-4xl font-bold text-red-500">
              +420 923 232 123
            </span>
            <span className="text-2xl">Se vším Vám rádi poradíme</span>
          </div>
          <ContactForm motorId={motorId} motorName={motorName} />
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
