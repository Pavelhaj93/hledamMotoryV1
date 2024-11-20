import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    transporter.sendMail(
      {
        ...mailOptions,
        subject: `Nová zpráva od ${name}`,
        text: message,
        html: `<h2>Nová zpráva od ${name}</h2><br></br><p>${message}</p><br></br><p>Zpráva od ${email}</p>`,
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

    return NextResponse.json(body);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
