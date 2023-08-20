import prisma from "@/app/libs/prismadb";

export type Props = {
  params: {
    motorsVariant: string;
  };
};

export async function fetchMotors(params: Props["params"]) {
  let motor;

  if (params.motorsVariant === "stare-motory") {
    motor = await prisma.oldMotor.findMany();
  } else if (params.motorsVariant === "repasovane-motory") {
    motor = await prisma.motor.findMany();
  }

  return motor;
}
