import prismaDB from "@/prisma/prismaDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const turbos = await prismaDB.turbo.findMany();

    return NextResponse.json(turbos);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
