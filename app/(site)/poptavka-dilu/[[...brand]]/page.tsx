import type { Metadata } from "next";
// import InquiryForm from "./components/InquiryForm";

const metadata: Metadata = {
  title: "Poptávka motorů nebo dílů | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí.",
};

export default function InquiryPage() {
  return (
    <div className="container h-[600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Nezávazná poptávka motorů nebo dílů
      </h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Pokud hledáte motor nebo díl, který jste nenašli na našich stránkách,
        neváhejte nás kontaktovat. Vyplňte formulář níže a my se vám co nejdříve
        ozveme s nabídkou.
      </p>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg border">
        {/* <InquiryForm /> */}
        <h2 className="text-xl font-bold mb-4">
          Formulář bude brzy k dispozici. Právě ho připravujeme, prosím
          kontakujte nás na telefon nebo emailem. Děkujeme za pochopení.
        </h2>
      </div>
    </div>
  );
}
