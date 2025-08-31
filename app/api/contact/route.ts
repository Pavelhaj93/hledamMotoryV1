import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Verify SMTP config
    await transporter.verify().catch((err) => {
      console.error("SMTP verification failed:", err);
      throw new Error("SMTP verification failed");
    });

    await transporter.sendMail({
      ...mailOptions,
      subject: `Nová zpráva od - email ${email}`,
      text: message,
      html: `<h2>Nová zpráva od - email ${email}</h2><br></br><p>${message}</p><br></br>>`,
      replyTo: email,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (err: unknown) {
    console.error("Failed to send email:", err);
    const errorMessage =
      typeof err === "object" && err !== null && "message" in err
        ? (err as { message?: string }).message || "An error occurred"
        : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
