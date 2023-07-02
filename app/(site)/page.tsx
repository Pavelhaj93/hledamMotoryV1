import MotorsList from "./components/MotorsList";
import prisma from "@/app/libs/prismadb";
import Container from "@/components/container/Container";

export default async function Home() {
  const data = await prisma.motor.findMany();

  return (
    <>
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-between p-5">
          <MotorsList data={data} />
        </div>
      </Container>
    </>
  );
}
