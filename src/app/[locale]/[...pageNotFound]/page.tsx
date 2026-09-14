import { notFound } from 'next/navigation';

export { generateMetadata } from '@/app/[locale]/not-found';

export default function PageNotFound() {
  notFound();
}
