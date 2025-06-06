import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismaDB from "@/prisma/prismaDB";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
