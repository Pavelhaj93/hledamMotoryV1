import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { mailOptions, transporter } from "@/config/nodemailer";
import { RequestMotor } from "@/app/hooks/useRequestMotors";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requests, email, phone, note } = body;

    if (!requests || !email || !phone) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const findMotorsInDb = requests.forEach(async (element: RequestMotor) => {
      const findMark = await prisma.mark.findUnique({
        where: { name: element.mark ?? "" },
      });
      const findModel = await prisma.model.findUnique({
        where: { name: element.model ?? "" },
      });
      const findEngineType = await prisma.engineType.findUnique({
        where: { name: element.engineType ?? "" },
      });

      if (!findMark || !findModel || !findEngineType) {
        return new NextResponse("Motor neexistuje v databázi", { status: 404 });
      }
    });

    if (findMotorsInDb) {
      return new NextResponse("Motor neexistuje v databázi", { status: 404 });
    }

    transporter.sendMail(
      {
        ...mailOptions,
        subject: `Nová zpráva od - email ${email}`,
        text: note,
        html: `<h2>Nová zpráva od - email ${email} ${
          phone ? `- telefon ${phone}` : ""
        }  </h2><br></br><h3>Uživatel má zájem o motory:</h3><div>${requests.map(
          (request: RequestMotor) => {
            return `<div>
             <h4>Značka: ${request.mark}</h4>
              <h4>Model: ${request.model}</h4>
              <h4>Motorizace: ${request.engineType}</h4>
              <h4>Dodatečná zpráva k motoru: ${request.textArea}</h4>
          </div>`;
          }
        )}</div><br></br><p>${note}</p>`,
      },
      (err, info) => {
        if (err) {
          console.error(err);
          return new NextResponse("Failed to send the message", {
            status: 500,
          });
        }
      }
    );

    return NextResponse.json(
      { message: "Zpráva úspěsně odeslána" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
