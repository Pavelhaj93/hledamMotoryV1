import ContactSection from "@/app/(site)/components/sections/ContactSection";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";
import Image from "next/image";

export default async function Motor({
  params,
}: {
  params: { motorId: string };
}) {
  const motor = await prisma.motorOld.findUnique({
    where: {
      id: params.motorId,
    },
  });

  if (!motor) {
    return <>Motor nenalezen</>;
  }

  return (
    <>
      <Container>
        <div className="flex max-lg:flex-row flex-col items-center justify-evenly gap-20">
          <Image
            src={motor.image ?? "/images/placeholder.png"}
            alt={motor.name}
            width={550}
            height={800}
          />
          <div className="flex flex-col gap-10 ">
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
              <p className="text-lg font-semibold">{motor?.description}</p>
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
