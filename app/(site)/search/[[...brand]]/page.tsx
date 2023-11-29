import { Metadata } from "next";
import Container from "@/components/container/Container";
import { InquiryContextProvider } from "@/app/context/InquiryContext";
import SelectorsWrap from "./components/LeftSide/SelectorsWrap";

export const metadata: Metadata = {
  title: "Poptávka motorů | hledammotory.cz",
  description:
    "Hledáte repasovaný motor? Nebo starý motor? Na Hledammotory.cz najdete repasované motory, staré motory, ojeté motory a další. Všechny repasované motory jsou s garancí. ",
};

export default async function SearchPage({
  params,
}: Readonly<{
  params: { brand: string };
}>) {
  const { brand } = params;

  return (
    <main>
      <section className="min-h-screen">
        <Container>
          <div className="flex flex-col w-full items-center">
            <h1 className="my-16 text-center text-4xl max-lg:text-red-500 text-black font-black">
              Začít hledat motor
            </h1>
            <div className="flex flex-row items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full">
                {/* parts wrap */}
                <InquiryContextProvider>
                  <SelectorsWrap brand={brand} />
                </InquiryContextProvider>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
