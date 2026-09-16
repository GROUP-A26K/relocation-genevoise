'use client';

import { usePropertyPhotoTour } from '@/features/property/property.hooks';

import { PhotoTourView } from './PhotoTourView';

import type { IAreaPhotoTour } from '@/models/property';

interface IPhotoTourClientProps {
  slug: string;
  locale: string;
  areas: IAreaPhotoTour[];
}

export function PhotoTourClient({
  slug,
  locale,
  areas: initialAreas,
}: IPhotoTourClientProps) {
  const query = usePropertyPhotoTour(slug, locale);
  return <PhotoTourView areas={query.data?.areas ?? initialAreas} />;
}
