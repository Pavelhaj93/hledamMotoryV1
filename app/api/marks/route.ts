import prismaDB from "@/prisma/prismaDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const marks = await prismaDB.mark.findMany();

    if (!marks) {
      return new NextResponse("Not marks found", { status: 404 });
    }

    return NextResponse.json(marks);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
