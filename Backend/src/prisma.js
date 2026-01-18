import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const ca = process.env.SUPABASE_CA_CERT
  ? process.env.SUPABASE_CA_CERT.replace(/\\n/g, "\n")
  : undefined;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: ca
    ? { ca, rejectUnauthorized: true }
    : { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
