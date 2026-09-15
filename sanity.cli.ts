import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: './src/sanity/extract.json',
    generates: './src/sanity/types.ts',
  },
});
