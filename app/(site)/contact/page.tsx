import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | O nás | hledammotory.cz",
  description: "O nás a kontakt",
};

export default async function ContactPage() {
  return (
    <main className="flex items-center justify-center">O nás a kontakt</main>
  );
}
