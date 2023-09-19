import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { motorSlug: string } }
) {
  try {
    const body = await req.json();
    const { name, email, message, motorVariant } = body;

    if (!name || !email || !message || !motorVariant) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    let motor;
    if (motorVariant === "stary-motor") {
      motor = await prisma?.oldMotor.findUnique({
        where: { slug: params.motorSlug },
      });
    } else {
      motor = await prisma?.motor.findUnique({
        where: { slug: params.motorSlug },
      });
    }

    if (!motor) {
      return new NextResponse("Motor nenalezen", { status: 404 });
    }

    await transporter.sendMail({
      ...mailOptions,
      subject: `Nová zpráva od ${name} - email ${email}`,
      text: message,
      html: `<h2>Nová zpráva od ${name}</h2><br></br><h3>Uživatel ${name} má zájem o motor ${motor?.name} s ID: ${motor?.id} a cenou ${motor?.price} CZK.</h3><br></br><p>Zpráva od uživatele: ${message}</p>`,
    });

    return new NextResponse("Zpráva úspěsně odeslána", { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
