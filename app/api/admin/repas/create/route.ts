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

    const motor = await prisma.motor.create({
      data: {
        name,
        description,
        markName,
        price,
        images,
        slug: "",
      },
    });

    const slug = generateSlug(name, motor.id); // Assuming motor object has an 'id' property

    // Update the motor's slug in the database
    await prisma.motor.update({
      where: { id: motor.id },
      data: { slug },
    });

    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
