import prismaDB from "@/prisma/prismaDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const motors = await prismaDB.motorHead.findMany();

    if (!motors) {
      return new NextResponse("No motors found", { status: 404 });
    }

    return NextResponse.json(motors);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
