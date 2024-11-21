import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          ...mailOptions,
          subject: `Nová zpráva od - email ${email}`,
          text: message,
          html: `<h2>Nová zpráva od - email ${email}</h2><br></br><p>${message}</p><br></br>>`,
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

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Failed to send email:", err);
    return NextResponse.json(
      { error: err || "An error occurred" },
      { status: 500 }
    );
  }
}
