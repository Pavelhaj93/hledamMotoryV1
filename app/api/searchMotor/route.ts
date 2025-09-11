import { NextResponse } from "next/server";
import prismaDB from "@/prisma/prismaDB";
import { mailOptions, transporter } from "@/config/nodemailer";
import { ProductCardType } from "@/app/(site)/poptavka-dilu/[[...brand]]/components/InquiryForm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { personalInfo, products } = body;

    if (!personalInfo || !products) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const { name, phone, email, note } = personalInfo;

    if (!name || !email) {
      return new NextResponse("Missing personal info fields", { status: 400 });
    }

    if (products.length === 0) {
      return new NextResponse("No products in the request", { status: 400 });
    }

    for (const element of products as ProductCardType[]) {
      const findMark = await prismaDB.mark.findUnique({
        where: { name: element.brand ?? "" },
      });
      console.log("findMark", findMark);
      const findModel = await prismaDB.model.findUnique({
        where: { name: element.model ?? "" },
      });
      console.log("findModel", findModel);
      const findEngineType = await prismaDB.engineType.findUnique({
        where: { name: element.engineType ?? "" },
      });
      console.log("findEngineType", findEngineType);

      if (!findMark || !findModel || !findEngineType) {
        return new NextResponse("Produkt neexistuje v databázi", {
          status: 404,
        });
      }
    }

    transporter.sendMail(
      {
        ...mailOptions,
        subject: `Nová zpráva od - email ${email}`,
        text: note,
        html: `<h2>Nová zpráva od - email ${email} ${
          phone ? `- telefon ${phone}` : ""
        }  </h2><br></br><h3>Uživatel má zájem o produkty:</h3><div>${products.map(
          (product: ProductCardType) => {
            return `<div>
             <h4>Značka: ${product.brand}</h4>
              <h4>Model: ${product.model}</h4>
              <h4>Motorizace: ${product.engineType}</h4>
              <h4>Dodatečná zpráva k produktu: ${product.notes}</h4>
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
