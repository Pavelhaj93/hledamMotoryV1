import { NextResponse } from "next/server";

import prismaDB from "@/prisma/prismaDB";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary (ensure that your Cloudinary credentials are set in environment variables)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to extract public_id from Cloudinary URL
const extractPublicId = (url: string) => {
  const parts = url.split("/");
  const versionIndex = parts.findIndex((part) => part.startsWith("v"));
  const publicIdWithExt = parts.slice(versionIndex + 1).join("/");
  const publicId = publicIdWithExt.substring(
    0,
    publicIdWithExt.lastIndexOf(".")
  );
  return publicId;
};

export async function DELETE(
  req: Request,
  { params }: { params: { motorId: string } }
) {
  try {
    const { motorId } = params;

    if (!motorId) {
      return new NextResponse("Missing fields, id", { status: 400 });
    }

    // Fetch the images of the motor from the database
    const motor = await prismaDB.motor.findUnique({
      where: {
        id: motorId,
      },
      select: {
        images: true,
      },
    });

    if (!motor) {
      return new NextResponse("Motor not found", { status: 404 });
    }

    const { images } = motor;

    // Delete each image from Cloudinary
    const deletePromises = images.map((imageUrl: string) => {
      const publicId = extractPublicId(imageUrl);
      return cloudinary.v2.api.delete_resources([publicId]);
    });

    // Wait for all Cloudinary deletions to complete
    await Promise.all(deletePromises);

    await prismaDB.motor.delete({
      where: {
        id: motorId,
      },
    });

    revalidatePath("/");
    revalidatePath(`/kategorie/repasovane-motory`);

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

    const motor = await prismaDB.motor.update({
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

    revalidatePath("/");
    revalidatePath(`/kategorie/repasovane-motory`);
    revalidatePath("/produkt/repasovany-motor/" + motor.slug);

    return NextResponse.json(motor);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
