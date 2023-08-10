import { Metadata } from "next";
import InquirySection from "./components/InquirySection";

export const metadata: Metadata = {
  title: "Rekapitulace poptávky | hledammotory.cz",
  description: "Rekapitulace poptávky hledaných motorů na hledammotory.cz",
};

export default async function InquiryPage() {
  return (
    <>
      <InquirySection />
    </>
  );
}
