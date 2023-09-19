import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { selectedMark: string } }
) {
  try {
    const models = await prisma.model.findMany({
      where: { markName: params.selectedMark },
    });

    if (!models) {
      return new NextResponse("Model nenalezen", { status: 404 });
    }

    return NextResponse.json(models);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
