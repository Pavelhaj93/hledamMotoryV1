import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { motorId: string } }
) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const motor = await prisma.motor.findUnique({
      where: { id: Number(params.motorId) },
    });

    let oldMotor;

    if (!motor) {
      oldMotor = await prisma.oldMotor.findUnique({
        where: { id: Number(params.motorId) },
      });
    }

    if (!motor && !oldMotor) {
      return new NextResponse("Motor nenalezen", { status: 404 });
    }

    await transporter.sendMail({
      ...mailOptions,
      subject: `Nová zpráva od ${name}`,
      text: message,
      html: `<h2>Nová zpráva od ${name}</h2><br></br><h3>Uživatel má zájem o motor ${motor.name} s ID: ${motor.id} a cenou ${motor.price}</h3>{<br></br><p>${message}</p>`,
    });

    return NextResponse.json(body);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
