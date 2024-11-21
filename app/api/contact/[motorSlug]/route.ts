import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { SafeMotor } from "@/app/(site)/(motory)/components/MotorsList";

export async function POST(
  req: Request,
  { params }: { params: { motorSlug: string } }
) {
  try {
    const body = await req.json();
    const { email, message, motorVariant } = body;

    if (!email || !message || !motorVariant) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    let motor: any;
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

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          ...mailOptions,
          subject: `Nová zpráva od - email ${email}`,
          text: message,
          html: `<h2>Nová zpráva od - email ${email}</h2><br></br><h3>Uživatel ${email} má zájem o motor ${motor?.name} s ID: ${motor?.id} a cenou ${motor?.price} CZK.</h3><br></br><p>Zpráva od uživatele: ${message}</p>`,
          replyTo: email,
        },
        (err, info) => {
          if (err) {
            console.error("err", err);
            reject(err);
          }
          if (info) {
            console.log("info", info);
            resolve(info);
          }
        }
      );
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
