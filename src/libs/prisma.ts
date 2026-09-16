import { PrismaClient } from '@prisma/client';

import { Env } from './env';

type GlobalPrismaCache = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = global as GlobalPrismaCache;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (Env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
