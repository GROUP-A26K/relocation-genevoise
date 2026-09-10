declare module '*.css';

// Next's built-in `*.svg` declaration resolves to `any` (to stay compatible
// with @svgr/webpack). This project imports SVGs as static images only, so
// give them the same type as every other static image import.
declare module '@/assets/*.svg' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}
