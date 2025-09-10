import { NextResponse } from "next/server";
import prismaDB from "@/prisma/prismaDB";

export async function GET(req: Request, props: { params: Promise<{ selectedModel: string }> }) {
  const params = await props.params;
  try {
    const models = await prismaDB.engineType.findMany({
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
