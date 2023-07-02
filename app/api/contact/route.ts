import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // const contact = await prisma.contact.create({
    //     data: {
    //     name,
    //     email,
    //     phone,p
    //     message,
    //     },
    // });

    console.log(body);
    return NextResponse.json(body);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
