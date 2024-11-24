import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | undefined;

const db = prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") prisma = db;

export default db;