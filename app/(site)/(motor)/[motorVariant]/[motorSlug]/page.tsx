import ContactSection from "@/app/(site)/components/sections/ContactSection";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import ImageGallery from "../../components/ImageGallery";
import { Metadata } from "next";

type Props = {
  params: {
    motorSlug: string;
    motorVariant: string;
  };
};

async function fetchMotor(params: Props["params"]) {
  let motor;

  if (params.motorVariant === "stary-motor") {
    motor = await prisma.oldMotor.findUnique({
      where: {
        slug: params.motorSlug,
      },
    });
  } else if (params.motorVariant === "repasovany-motor") {
    motor = await prisma.motor.findUnique({
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
}: {
  params: { motorSlug: string; motorVariant: string };
}) {
  const motor = await fetchMotor(params);

  if (!motor) {
    return <main>Motor nenalezen</main>;
  }

  function DisplayParagraph({ text }: { text: string }) {
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
    <main>
      <Container>
        <div className="flex max-lg:flex-col flex-row items-center justify-evenly gap-20 mt-10">
          <ImageGallery motor={motor} />
          <div className="flex flex-col gap-10 w-7/12 max-lg:w-full max-lg:px-5">
            <h1 className="text-3xl font-bold text-black uppercase text-left">
              {motor?.name}
            </h1>
            <div>
              <span className="text-3xl text-red-500 font-bold">
                {motor?.price} CZK
              </span>
            </div>
            <div className="flex flex-col justify-center max-lg:items-center">
              <DisplayParagraph text={motor.description ?? ""} />
            </div>
          </div>
        </div>
      </Container>
      <ContactSection
        title="Máte zájem o tento motor?"
        motorId={motor.id}
        motorName={motor.name}
        motorSlug={motor.slug}
        motorVariant={params.motorVariant}
      />
    </main>
  );
}
