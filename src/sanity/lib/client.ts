import 'server-only';
import { createClient } from '@sanity/client';

import { Env } from '@/libs/env';

export const client = createClient({
  projectId: Env.SANITY_PROJECT_ID,
  dataset: Env.SANITY_DATASET,
  apiVersion: Env.SANITY_API_VERSION,
  token: Env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: 'published',
});
