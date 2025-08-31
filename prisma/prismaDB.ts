import { PrismaClient } from "@prisma/client";

declare global {
  var prismaDb: PrismaClient | undefined;
}

const prismaDB = globalThis.prismaDb || new PrismaClient();
if (process.env.NODE_ENV === "production") globalThis.prismaDb = prismaDB;

export default prismaDB;
