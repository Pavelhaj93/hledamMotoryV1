import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { selectedModel: string } }
) {
  console.log(params.selectedModel);
  try {
    const models = await prisma.engineType.findMany({
      where: { modelName: params.selectedModel },
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
