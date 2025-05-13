import type { RequestMotor } from "../hooks/useRequestMotors";

export const generateSlug = (str: string, id: string) => {
  const slug = str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  return `${slug}-${id}`;
};

export const getInquiryFooterAmount = (requestMotors: RequestMotor[]) => {
  const amount = requestMotors?.length;
  if (amount === 1) {
    return `Máte <b>${amount} motor </b>připraven k poptání`;
  }
  if (amount > 1 && amount < 5) {
    return `Máte <b>${amount} motory</b> připraveny k poptání`;
  }
  return `Máte <b>${amount} motorů</b> připraveno k poptání`;
};

export const formatPrice = (price: number) => {
  if (typeof price !== "number") {
    throw new Error("Input must be a number");
  }

  return price.toLocaleString("cs-CZ");
};
