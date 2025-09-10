import { NextResponse } from "next/server";
import prismaDB from "@/prisma/prismaDB";
import { generateSlug } from "@/app/utils/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);
    const { name, description, price, images, markName } = body;

    if (!name || !markName || !description || !price || !images) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const turbo = await prismaDB.turbo.create({
      data: {
        name,
        description,
        markName,
        price,
        images,
        slug: "",
      },
    });

    if (!turbo) {
      return new NextResponse("Failed to create turbo", { status: 500 });
    }

    // Generate the motor's slug
    const slug = generateSlug(name, turbo.id);

    // Update the turbo's slug in the database
    const updatedTurbo = await prismaDB.turbo.update({
      where: {
        id: turbo.id,
      },
      data: {
        slug,
      },
    });

    if (!updatedTurbo) {
      return new NextResponse("Failed to update turbo slug", { status: 500 });
    }

    revalidatePath("/");
    revalidatePath(`/kategorie/turbodmychadla`);

    return NextResponse.json(updatedTurbo);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
