import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await transporter.sendMail(
      {
        ...mailOptions,
        subject: `Nová zpráva od - email ${email}`,
        text: message,
        html: `<h2>Nová zpráva od - email ${email}</h2><br></br><p>${message}</p><br></br>>`,
      },
      (err, info) => {
        if (err) {
          console.error("err", err);
          return new NextResponse("Failed to send the message", {
            status: 500,
          });
        }
        if (info) {
          console.log("info", info);
          return NextResponse.json(info, { status: 200 });
        }
      }
    );

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
