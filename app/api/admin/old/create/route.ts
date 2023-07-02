import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, image, markName } = body;

    if (!name || !markName || !description || !price || !image) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prisma.oldMotor.create({
      data: {
        name,
        description,
        markName,
        price,
        image,
      },
    });

    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
