// @ts-nocheck
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig(
  globalIgnores([
    'eslint.config.mjs',
    'postcss.config.mjs',
    '.next/**',
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'src/sanity/extract.json',
    'next-env.d.ts',
  ]),

  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    plugins: {
      perfectionist,
    },
    rules: {
      // Sort import
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'unknown',
          ],
          newlinesBetween: 1,
        },
      ],

      // React / JSX
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never',
        },
      ],

      // TypeScript quality
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'warn',

      // Promise / async
      '@typescript-eslint/no-floating-promises': [
        'warn',
        {
          ignoreVoid: true,
        },
      ],

      // Clean code
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                'Prefer using alias import "@/..." instead of deep relative imports.',
            },
          ],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  {
    // Next.js requires `rewrites`/`redirects` to return a Promise, so these
    // config methods must stay `async` even without an `await` inside.
    files: ['next.config.ts', '*.config.ts', '*.config.mjs'],
    rules: {
      '@typescript-eslint/require-await': 'off',
    },
  },

  eslintConfigPrettier
);
