import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { motorId: string } }
) {
  try {
    const { motorId } = params;
    console.log(motorId);

    if (!motorId) {
      return new NextResponse("Missing fields, id", { status: 400 });
    }

    const motor = await prisma.motor.delete({
      where: {
        id: motorId,
      },
    });

    console.log(motor);
    return NextResponse.json(motorId);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { motorId: string } }
) {
  try {
    const { motorId } = params;
    const body = await req.json();
    const { name, description, price, images, markName } = body;

    if (!motorId || !name || !description || !price || !markName) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prisma.motor.update({
      where: {
        id: motorId,
      },
      data: {
        name,
        description,
        price,
        markName,
        images,
      },
    });

    console.log(motor);
    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
