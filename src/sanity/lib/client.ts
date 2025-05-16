import { createClient } from 'next-sanity';
import { Env } from '@/libs/Env';
export const client = createClient({
  projectId: Env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: Env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: Env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: Env.NEXT_PUBLIC_SANITY_STUDIO_URL },
});
