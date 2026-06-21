import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// For Prisma 7, we need to use an adapter
// Using a simple connection pool adapter
const connectionString = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (connectionString?.includes('neon.tech')) {
  // If using Neon, use the Neon adapter
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  prismaInstance = new PrismaClient({ adapter });
} else {
  // For local PostgreSQL, use driverAdapters with pg
  const { Pool: PgPool } = require('pg');
  const { PrismaPg } = require('@prisma/adapter-pg');
  
  const pool = new PgPool({ connectionString });
  const adapter = new PrismaPg(pool);
  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
