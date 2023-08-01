import ContactSection from "@/app/(site)/components/sections/ContactSection";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import ImageGallery from "../../components/ImageGallery";

export default async function OldMotor({
  params,
}: {
  params: { motorId: string };
}) {
  const motor = await prisma.oldMotor.findUnique({
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
          <ImageGallery motor={motor} />
          <div className="flex flex-col gap-10 w-7/12 max-lg:w-full max-lg:px-5">
            <h1 className="text-3xl font-bold text-black uppercase text-left">
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
