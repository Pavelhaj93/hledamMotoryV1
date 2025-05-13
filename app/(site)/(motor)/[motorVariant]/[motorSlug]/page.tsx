import ContactSection from "@/app/(site)/_components/sections/ContactSection";
import prismaDB from "@/prisma/prismaDB";
import Container from "@/components/container/Container";
import ImageGallery from "../../components/ImageGallery";
import type { Metadata } from "next";
import { formatPrice } from "@/app/utils/utils";

type Props = {
  params: {
    motorSlug: string;
    motorVariant: string;
  };
};

async function fetchMotor(params: Props["params"]) {
  let motor;

  if (params.motorVariant === "stary-motor") {
    motor = await prismaDB.oldMotor.findUnique({
      where: {
        slug: params.motorSlug,
      },
    });
  } else if (params.motorVariant === "repasovany-motor") {
    motor = await prismaDB.motor.findUnique({
      where: {
        slug: params.motorSlug,
      },
    });
  } else if (params.motorVariant === "motorova-hlava") {
    motor = await prismaDB.motorHead.findUnique({
      where: {
        slug: params.motorSlug,
      },
    });
  }

  return motor;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;

  const motor = await fetchMotor(params);

  return {
    title: `${motor?.name} | hledammotory.cz`,
    description: motor?.description ?? "",
  };
};

export default async function Motor({
  params,
}: Readonly<{
  params: { motorSlug: string; motorVariant: string };
}>) {
  const motor = await fetchMotor(params);

  if (!motor) {
    return <main>Motor nenalezen</main>;
  }

  function DisplayParagraph({ text }: Readonly<{ text: string }>) {
    const lines = text.split("\n");

    return (
      <div className="w-full">
        {lines.map((line, index) => (
          <p className="font-bold text-md leading-loose" key={index}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="flex max-lg:flex-col flex-row items-center justify-evenly gap-20 mt-10">
          <ImageGallery motor={motor} />
          <div className="flex flex-col gap-10 w-7/12 max-lg:w-full">
            <h1 className="text-3xl font-bold text-black uppercase text-left">
              {motor?.name}
            </h1>
            <div>
              <span className="text-3xl text-red-500 font-bold">
                {formatPrice(motor?.price ?? 0)} CZK
              </span>
            </div>
            <div className="flex flex-col justify-center max-lg:items-center">
              <DisplayParagraph text={motor.description ?? ""} />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <ContactSection
          title="Máte zájem o tento motor?"
          motorId={motor.id}
          motorName={motor.name}
          motorSlug={motor.slug}
          motorVariant={params.motorVariant}
        />
      </Container>
    </>
  );
}
