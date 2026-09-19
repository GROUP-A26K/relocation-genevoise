import { PrismaClient } from '@prisma/client';

import { Env } from './env';

type TGlobalPrismaCache = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = global as TGlobalPrismaCache;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (Env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
