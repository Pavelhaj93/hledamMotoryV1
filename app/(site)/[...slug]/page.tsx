import { Metadata } from "next";
import Section404 from "./components/Section404";

export const metadata: Metadata = {
  title: "404 | hledammotory.cz",
  description: "404 Stránka nenalezena",
};

export default async function NotFoundPage() {
  return (
    <main className="flex items-center">
      <Section404 />
    </main>
  );
}
