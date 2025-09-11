import type { Metadata } from "next";
import InquiryForm from "./components/InquiryForm";

const metadata: Metadata = {
  title: "Poptávka motorů nebo dílů | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí.",
};

export default function InquiryPage() {
  return (
    <div className="container h-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Nezávazná poptávka motorů nebo dílů
      </h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Pokud hledáte motor nebo díl, který jste nenašli na našich stránkách,
        neváhejte nás kontaktovat. Vyplňte formulář níže a my se vám co nejdříve
        ozveme s nabídkou.
      </p>

      <InquiryForm />
    </div>
  );
}
