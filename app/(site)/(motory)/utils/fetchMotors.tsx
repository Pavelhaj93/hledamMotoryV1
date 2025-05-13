import prismaDB from "@/prisma/prismaDB";

export type Props = {
  params: {
    motorsVariant: string;
  };
};

export async function fetchMotors(params: Props["params"]) {
  let motor;

  if (params.motorsVariant === "stare-motory") {
    motor = await prismaDB.oldMotor.findMany();
  } else if (params.motorsVariant === "repasovane-motory") {
    motor = await prismaDB.motor.findMany();
  } else if (params.motorsVariant === "motorove-hlavy") {
    motor = await prismaDB.motorHead.findMany();
  }

  return motor;
}
