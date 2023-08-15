import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { generateSlug } from "@/app/utils/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, images, markName } = body;

    if (!name || !markName || !description || !price || !images) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prisma.oldMotor.create({
      data: {
        name,
        description,
        markName,
        price,
        images,
        slug: "",
      },
    });

    const slug = generateSlug(name, motor.id);

    // Update the motor's slug in the database
    await prisma.oldMotor.update({
      where: {
        id: motor.id,
      },
      data: {
        slug,
      },
    });

    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
