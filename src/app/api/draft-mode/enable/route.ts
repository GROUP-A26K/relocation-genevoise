import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';
import { Env } from '@/libs/Env';

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: Env.SANITY_API_READ_TOKEN }),
});
