import { Env } from '@/libs/Env';
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: Env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: Env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
