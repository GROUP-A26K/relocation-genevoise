import { PrismaClient as MysqlPrismaClient } from "@prisma/mysql-client";
import { PrismaClient as SupabasePrismaClient } from "@prisma/supabase-client";
import { Env } from "./Env";

type GlobalPrismaCache = typeof globalThis & {
  mysqlPrisma?: MysqlPrismaClient;
  supabasePrisma?: SupabasePrismaClient;
};

const globalForPrisma = global as GlobalPrismaCache;

export const prismaMysql =
  globalForPrisma.mysqlPrisma || new MysqlPrismaClient();

export const prismaSupabase =
  globalForPrisma.supabasePrisma || new SupabasePrismaClient();

if (Env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = prismaMysql;
  globalForPrisma.supabasePrisma = prismaSupabase;
}

export const prisma = prismaMysql;

type MysqlMutation<T> = (client: MysqlPrismaClient) => Promise<T>;
type SupabaseMutation<T, M> = (
  client: SupabasePrismaClient,
  mysqlResult: M
) => Promise<T>;

interface ReplicationOptions<M> {
  rollback?: (client: MysqlPrismaClient, mysqlResult: M) => Promise<void>;
  onError?: (error: unknown) => void;
}

export async function executeWithReplication<M, S = void>(
  mysqlMutation: MysqlMutation<M>,
  supabaseMutation?: SupabaseMutation<S, M>,
  options: ReplicationOptions<M> = {}
) {
  const mysqlResult = await mysqlMutation(prismaMysql);

  if (!supabaseMutation) {
    return { mysql: mysqlResult } as { mysql: M; supabase?: S };
  }

  try {
    const supabaseResult = await supabaseMutation(prismaSupabase, mysqlResult);

    return { mysql: mysqlResult, supabase: supabaseResult } as {
      mysql: M;
      supabase: S;
    };
  } catch (error) {
    console.error("Supabase replication failed", error);

    if (options.rollback) {
      try {
        await options.rollback(prismaMysql, mysqlResult);
      } catch (rollbackError) {
        console.error(
          "Rollback after replication failure failed",
          rollbackError
        );
      }
    }

    if (options.onError) {
      options.onError(error);
    }

    return { mysql: mysqlResult } as { mysql: M; supabase?: S };
  }
}
