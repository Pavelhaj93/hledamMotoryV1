import prismaDB from "@/prisma/prismaDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const motors = await prismaDB.motor.findMany();

    return NextResponse.json(motors);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
