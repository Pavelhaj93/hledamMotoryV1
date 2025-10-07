import { NextResponse } from "next/server";
import { mailOptions, transporter } from "@/config/nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Send email
    await transporter.sendMail({
      ...mailOptions,
      subject: `Nová zpráva z webu - od: ${name}`,
      text: message,
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
        <p><strong>Zpráva:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Zpráva úspěšně odeslána" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email send error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
