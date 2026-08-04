import "server-only";

import { createClient } from "next-sanity";

import { Env } from "@/libs/Env";

export const client = createClient({
  projectId: Env.SANITY_PROJECT_ID,
  dataset: Env.SANITY_DATASET,
  apiVersion: Env.SANITY_API_VERSION,
  token: Env.SANITY_API_READ_TOKEN,
  useCdn: true,
});
