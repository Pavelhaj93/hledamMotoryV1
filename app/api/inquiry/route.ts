import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, surName, phone, city, note } = body;

    if (!email || !name || !surName || !phone) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await transporter.sendMail(
      {
        ...mailOptions,
        subject: `Nová zpráva od ${name} ${surName}`,
        text: note,
        html: `<h2>Nová zpráva od ${name} ${surName} - email ${email} - město ${city}</h2><br></br><h3>Uživatel má zájem o motor</h3>{<br></br><p>${note}</p>`,
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
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
