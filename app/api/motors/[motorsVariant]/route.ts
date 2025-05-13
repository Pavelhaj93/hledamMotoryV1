import { NextResponse } from "next/server";

import prismaDB from "@/prisma/prismaDB";

export async function GET(
  req: Request,
  { params }: { params: { motorsVariant: string } }
) {
  try {
    const { motorsVariant } = params;

    const motorVariants = ["old", "repas", "motorHead"];

    if (!motorVariants.includes(motorsVariant)) {
      return new NextResponse("Invalid motors variant", { status: 400 });
    }

    if (!motorsVariant) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const fetchMotors = () => {
      switch (motorsVariant) {
        case "old":
          return prismaDB.oldMotor.findMany();
        case "repas":
          return prismaDB.motor.findMany();
        case "motorHead":
          return prismaDB.motorHead.findMany();
      }
    };

    const motors = await fetchMotors();

    return NextResponse.json(motors);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
