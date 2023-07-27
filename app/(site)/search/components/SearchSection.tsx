import Container from "@/components/container/Container";
import SelectorsWrap from "./SelectorsWrap";
import { InquiryContextProvider } from "@/app/context/InquiryContext";

interface SearchSectionProps {}

const SearchSection = () => {
  return (
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
                <SelectorsWrap />
              </InquiryContextProvider>
            </div>
            {/* <div className="hidden">Schovany selected box</div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchSection;