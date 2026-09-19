import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  BadgeCheck,
  CalendarCheck2,
  Camera,
  FileText,
  Globe,
  Scale,
  type LucideIcon,
} from 'lucide-react';

import { getPageAlternates } from '@/utils/seo';
import Hero from '@/components/sections/FindATenant/Hero';
import CtaBanner from '@/components/sections/FindATenant/CtaBanner';
import WhyChooseUs from '@/components/sections/FindATenant/WhyChooseUs';
import HeroImage from '@/assets/images/find-a-tenant/tenant/hero-image.webp';
import Services, {
  type TServiceItem,
} from '@/components/sections/FindATenant/Services';
import TestimonialAva1 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-1.webp';
import TestimonialAva2 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-2.webp';
import TestimonialAva3 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-3.webp';
import TestimonialAva4 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-4.webp';
import TestimonialAva5 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-5.webp';
import TestimonialAva6 from '@/assets/images/find-a-tenant/tenant/testimonial-avatar-6.webp';
import WhyChooseUsImage from '@/assets/images/find-a-tenant/tenant/why-choose-us-image.webp';
import RentalProcessImage from '@/assets/images/find-a-tenant/tenant/rental-process-image.webp';
import Testimonials, {
  type TTestimonial,
} from '@/components/sections/FindATenant/Testimonials';
import OurRentalProcess, {
  type TRentalStep,
} from '@/components/sections/FindATenant/OurRentalProcess';

import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';

const TESTIMONIAL_AVATARS: StaticImageData[] = [
  TestimonialAva1,
  TestimonialAva2,
  TestimonialAva3,
  TestimonialAva4,
  TestimonialAva5,
  TestimonialAva6,
] as const;

const SERVICE_ICONS: LucideIcon[] = [
  Camera,
  Globe,
  BadgeCheck,
  CalendarCheck2,
  FileText,
  Scale,
] as const;

export async function generateMetadata(
  props: PageProps<'/[locale]/find-a-tenant/tenant'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.FindATenantTenant',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/find-a-tenant/tenant'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/find-a-tenant/tenant'>
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('FindATenant');
  const imageT = await getTranslations('Images');

  const serviceItems: TServiceItem[] = (
    t.raw('Tenant.Services.items') as Omit<TServiceItem, 'Icon'>[]
  ).map((item, index) => ({
    ...item,
    Icon: SERVICE_ICONS[index],
  }));

  const rentalProcessSteps = t.raw(
    'Tenant.OurRentalProcess.steps'
  ) as TRentalStep[];

  const testimonials: TTestimonial[] = (
    t.raw('Tenant.Testimonials.items') as TTestimonial[]
  ).map((item, index) => ({
    ...item,
    avatar: TESTIMONIAL_AVATARS[index],
  }));

  return (
    <>
      <Hero
        active="tenant"
        tabLabels={{
          landlords: t('Tabs.landlords'),
          tenant: t('Tabs.tenant'),
        }}
        heading={t('Tenant.Hero.heading')}
        description={t('Tenant.Hero.description')}
        primaryCta={{
          text: t('Tenant.Hero.primaryCta'),
          href: '/find-a-tenant/tenant/form',
        }}
        secondaryCta={{
          text: t('Tenant.Hero.secondaryCta'),
          href: { pathname: '/find-a-tenant/tenant', hash: '#services' },
        }}
        image={{
          src: HeroImage,
          alt: imageT('findATenant.tenant.hero'),
          title: imageT('findATenant.tenant.hero'),
        }}
        stats={[
          {
            value: t('Tenant.Hero.stats.0.value'),
            label: t('Tenant.Hero.stats.0.label'),
          },
          {
            value: t('Tenant.Hero.stats.1.value'),
            label: t('Tenant.Hero.stats.1.label'),
          },
          {
            value: t('Tenant.Hero.stats.2.value'),
            label: t('Tenant.Hero.stats.2.label'),
          },
        ]}
      />

      <Services
        eyebrow={t('Tenant.Services.eyebrow')}
        heading={t('Tenant.Services.heading')}
        description={t('Tenant.Services.description')}
        cta={{ text: t('Tenant.Services.cta'), href: '/contact' }}
        items={serviceItems}
      />

      <OurRentalProcess
        eyebrow={t('Tenant.OurRentalProcess.eyebrow')}
        heading={t('Tenant.OurRentalProcess.heading')}
        image={{
          src: RentalProcessImage,
          alt: imageT('findATenant.tenant.rentalProcess'),
          title: imageT('findATenant.tenant.rentalProcess'),
        }}
        steps={rentalProcessSteps}
      />

      <WhyChooseUs
        eyebrow={t('Tenant.WhyChooseUs.eyebrow')}
        heading={t('Tenant.WhyChooseUs.heading')}
        description={t('Tenant.WhyChooseUs.description')}
        highlights={t.raw('Tenant.WhyChooseUs.highlights') as string[]}
        metrics={
          t.raw('Tenant.WhyChooseUs.metrics') as {
            value: string;
            label: string;
          }[]
        }
        image={{
          src: WhyChooseUsImage,
          alt: imageT('findATenant.tenant.whyChooseUs'),
          title: imageT('findATenant.tenant.whyChooseUs'),
        }}
      />

      <Testimonials
        eyebrow={t('Tenant.Testimonials.eyebrow')}
        heading={t('Tenant.Testimonials.heading')}
        description={t('Tenant.Testimonials.description')}
        items={testimonials}
      />

      <CtaBanner
        heading={t('Tenant.CtaBanner.heading')}
        description={t('Tenant.CtaBanner.description')}
        cta={{
          text: t('Tenant.CtaBanner.cta'),
          href: '/find-a-tenant/tenant/form',
        }}
      />
    </>
  );
}
