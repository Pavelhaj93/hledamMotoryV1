import { Metadata } from "next";
import SearchSection from "./components/SearchSection";

export const metadata: Metadata = {
  title: "Poptávka motorů | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default async function SearchPage() {
  return (
    <>
      <SearchSection />
    </>
  );
}
