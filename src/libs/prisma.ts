import { PrismaClient } from '@prisma/client';
import { Env } from './Env';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (Env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
