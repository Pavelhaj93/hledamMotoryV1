import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    try {
      const info = await transporter.sendMail({
        ...mailOptions,
        subject: `Nová zpráva od - email ${email}`,
        text: message,
        html: `<h2>Nová zpráva od - email ${email}</h2><br></br><p>${message}</p><br></br>>`,
      });

      console.log("Email sent:", info);
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error("Failed to send email:", err);
      return NextResponse.json(
        { error: "Failed to send the message" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
