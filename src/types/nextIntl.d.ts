import type messages from '@/locales/fr.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}
