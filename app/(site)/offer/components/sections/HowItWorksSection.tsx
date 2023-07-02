import Button from "@/components/Button";
import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full h-full overflow-hidden">
      <Container className="max-md:text-center">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-center mb-1 text-red-500">
            Princip
          </h3>
          <h2 className="text-4xl font-black text-center mb-10">
            Jak to funguje?
          </h2>
        </div>
        <div className="text-center py-20 pr-20 max-xl:pr-0">
          <div className="flex flex-row max-lg:flex-col items-center justify-center gap-6">
            <div className="step my-0 min-lg:my-4 flex flex-col justify-between items-center h-96 max-xl:h-600 gap-6">
              <div className="upperpart">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-form.png"
                    alt="icon-form"
                    width={56}
                    height={58}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-64">
                  Poptáte díl který hledáte
                </p>
              </div>
              <div className="navigators-row h-22 flex flex-row justify-center items-center my-6">
                <div className="block h-1 max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
              </div>
              <div className="lowerPart max-lg:ml-0 max-xl:ml-40 ml-80">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-speaker.png"
                    alt="icon-form"
                    width={56}
                    height={58}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-64">
                  Oslovíme za Vás všechny prodejce použitých autodílů
                </p>
              </div>
              <div className="navigators-row visible-t h-22 max-lg:block hidden  justify-center items-center py-6 max-lg:flex-row">
                <div className="block h-1 max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
              </div>
            </div>
            <div className="step my-0 max-xl:mt-10 flex flex-col justify-between items-center h-96 max-xl:h-600 gap-6 w-48">
              <div className="upperpart">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-envelope.png"
                    alt="icon-envelope"
                    width={56}
                    height={58}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-64">
                  Zašleme Vám odpovídající nabídky
                </p>
              </div>
              <div className="flex flex-row">
                <div className="navigators-row h-22 max-lg:hidden flex flex-row justify-center items-center my-6">
                  <div className="block h-1 max-lg:w-14 w-24 bg-red-500 rotate-135 max-lg:w-15 max-lg:rotate-90 "></div>
                </div>
                <div className="navigators-row h-22 flex flex-row justify-center items-center my-6">
                  <div className="block h-1 max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
                </div>
              </div>
              <div className="lowerPart max-lg:ml-0 max-xl:ml-60 ml-80">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-target.png"
                    alt="icon-target"
                    width={56}
                    height={58}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-64">
                  Vyberete si pro Vás tu nejlepší nabídku
                </p>
              </div>
              <div className="navigators-row visible-t h-22 max-lg:block hidden justify-center items-center py-6 max-lg:flex-row">
                <div className="block h-1 max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
              </div>
            </div>
            <div className="step my-0 max-xl:mt-10 flex flex-col justify-between items-center h-96 max-xl:h-480 gap-6">
              <div className="upperpart">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-hands.png"
                    alt="icon-hands"
                    width={56}
                    height={58}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-96">
                  Prodejce použitých autodílů Vás kontaktuje a domluvíte se na
                  způsobu předání
                </p>
              </div>
              <div className="flex flex-row">
                <div className="navigators-row h-22 max-lg:hidden flex flex-row justify-center items-center my-6">
                  <div className="block h-1 max-lg:max-lg:w-14 w-24 bg-red-500 rotate-135 max-lg:w-15 max-lg:rotate-90 "></div>
                </div>
                <div className="navigators-row h-22 flex flex-row justify-center items-center my-6">
                  <div className="block h-1 max-lg:max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
                </div>
              </div>
              <div className="lowerPart max-lg:ml-0 max-xl:ml-40 ml-64">
                <div className="flex h-20 items-center justify-center">
                  <Image
                    src="/images/frontend/flow-icons/icon-piston.png"
                    alt="icon-engine-piston"
                    width={76}
                    height={78}
                  />
                </div>
                <p className="text-xl mt-5 px-5 w-64">Máte díl u sebe</p>
              </div>
              <div className="navigators-row visible-t h-22 hidden justify-center items-center py-6 max-lg:flex-row">
                <div className="block h-1 max-lg:max-lg:w-14 w-24 bg-red-500 rotate-45 max-lg:w-15 max-lg:rotate-90 "></div>
              </div>
            </div>
          </div>
        </div>
        <Button color="primary" arrow>
          Poptat díl
        </Button>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
