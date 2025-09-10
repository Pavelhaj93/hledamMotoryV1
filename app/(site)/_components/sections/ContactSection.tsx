import Container from "@/components/container/Container";
import type { FC } from "react";
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
    <section className={`py-16 bg-gray-50 ${className}`}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-lg font-semibold mb-2 text-red-500 uppercase tracking-wide">
            Kontaktujte nás
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title ?? "Nejste si jisti nebo potřebujete poradit?"}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rádi vám pomůžeme s výběrem správného motoru nebo odpovíme na vaše
            dotazy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Zavolejte nám
                </h3>
                <a
                  href="tel:+420724704764"
                  className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  +420 724 704 764
                </a>
                <p className="text-gray-600 mt-2">
                  Pondělí - Pátek: 8:00 - 17:00
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Napište nám email
                </h3>
                <a
                  href="mailto:info@hledammotory.cz"
                  className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors break-all"
                >
                  info@hledammotory.cz
                </a>
                <p className="text-gray-600 mt-2">Odpovídáme do 24 hodin</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Firemní údaje
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">NEURO s.r.o.</p>
                  <p>Prachnerova 642/10</p>
                  <p>Praha 5, 150 00</p>
                  <p className="text-sm text-gray-600 mt-2">DIČ: CZ19679041</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <ContactForm
              motorId={motorId}
              motorName={motorName}
              motorSlug={motorSlug}
              motorVariant={motorVariant}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
