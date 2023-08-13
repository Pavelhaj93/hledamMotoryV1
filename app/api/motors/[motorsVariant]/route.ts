import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { motorsVariant: string } }
) {
  try {
    const { motorsVariant } = params;

    if (!motorsVariant) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const fetchMotors = () => {
      switch (motorsVariant) {
        case "old":
          return prisma.oldMotor.findMany();
        case "repas":
          return prisma.motor.findMany();
      }
    };

    const motors = await fetchMotors();

    return NextResponse.json(motors);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
