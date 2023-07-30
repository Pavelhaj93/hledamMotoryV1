import ContactSection from "@/app/(site)/components/sections/ContactSection";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import Image from "next/image";

export default async function Motor({
  params,
}: {
  params: { motorId: string };
}) {
  const motor = await prisma.motor.findUnique({
    where: {
      id: params.motorId,
    },
  });

  if (!motor) {
    return <>Motor nenalezen</>;
  }

  function DisplayParagraph({ text }: { text: string }) {
    const lines = text.split("\n");

    return (
      <div>
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
          <Image
            src={motor.image ?? "/images/placeholder.png"}
            alt={motor.name}
            width={550}
            height={800}
          />
          <div className="flex flex-col gap-10 ">
            <h1 className="text-4xl font-bold text-black uppercase text-left">
              {motor?.name}
            </h1>
            <div>
              <span className="text-3xl text-red-500 font-bold">
                {motor?.price} €
              </span>
              <span className="text-md font-semibold"> s DPH</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <DisplayParagraph text={motor.description ?? ""} />
            </div>
          </div>
        </div>
      </Container>
      <ContactSection
        title="Máte zájem o tento motor?"
        motorId={motor.id}
        motorName={motor.name}
      />
    </>
  );
}
