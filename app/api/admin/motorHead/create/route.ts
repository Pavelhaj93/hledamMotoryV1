import { NextResponse } from "next/server";
import prismaDB from "@/prisma/prismaDB";
import { generateSlug } from "@/app/utils/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, images, markName } = body;

    if (!name || !markName || !description || !price || !images) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prismaDB.motorHead.create({
      data: {
        name,
        description,
        markName,
        price,
        images,
        slug: "",
      },
    });

    // Generate the motor's slug
    const slug = generateSlug(name, motor.id);

    // Update the motor's slug in the database
    const updatedMotor = await prismaDB.motorHead.update({
      where: {
        id: motor.id,
      },
      data: {
        slug,
      },
    });

    console.log("Motor created with slug:", updatedMotor);

    return NextResponse.json(updatedMotor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
