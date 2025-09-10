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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse("Missing fields, id", { status: 400 });
    }

    // Fetch the images of the turbos from the database
    const turbo = await prismaDB.turbo.findUnique({
      where: {
        id,
      },
      select: {
        images: true,
      },
    });

    if (!turbo) {
      return new NextResponse("Turbo not found", { status: 404 });
    }

    const { images } = turbo;

    // Delete each image from Cloudinary
    const deletePromises = images.map((imageUrl: string) => {
      const publicId = extractPublicId(imageUrl);
      return cloudinary.v2.api.delete_resources([publicId]);
    });

    // Wait for all Cloudinary deletions to complete
    const awaitPromises = await Promise.all(deletePromises);

    if (!awaitPromises) {
      return new NextResponse("Failed to delete images", { status: 500 });
    }

    await prismaDB.turbo.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    revalidatePath(`/kategorie/turbodmychadla`);

    return NextResponse.json(id);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, description, price, images, markName } = body;

    if (!id || !name || !description || !price || !markName) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const turbo = await prismaDB.turbo.update({
      where: {
        id,
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
    revalidatePath(`/kategorie/turbodmychadla`);
    revalidatePath("/produkt/turbo/" + turbo.slug);

    return NextResponse.json(turbo);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
