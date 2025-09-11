import { NextResponse } from "next/server";
import prismaDB from "@/prisma/prismaDB";
import { generateSlug } from "@/app/utils/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, images, markName } = body;

    if (!name || !markName || !description || !price || !images) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prismaDB.motor.create({
      data: {
        name,
        description,
        markName,
        price,
        images,
        slug: "",
      },
    });

    const slug = generateSlug(name, motor.id); // Assuming motor object has an 'id' property

    // Update the motor's slug in the database
    await prismaDB.motor.update({
      where: { id: motor.id },
      data: { slug },
    });

    revalidatePath("/");
    revalidatePath(`/kategorie/repasovane-motory`);

    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
