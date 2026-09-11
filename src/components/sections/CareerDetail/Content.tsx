'use client';
import Link from 'next/link';
import { toast } from 'sonner';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { CircleDollarSign, Clock, MapPin, Share2 } from 'lucide-react';

import { Env } from '@/libs/Env';
import { cn } from '@/libs/utils';
import Alert from '@/components/customs/Alert';
import Button from '@/components/customs/Button';
import CtaBlock from '@/components/customs/CtaBlock';
import { StatsList } from '@/components/blocks/Stats';
import { type Block, BODY_BLOCKS } from '@/models/Block';
import { RevealItem } from '@/components/customs/Reveal';
import { FaqBlock } from '@/components/blocks/Faq/FaqBlock';
import { DynamicContent } from '@/components/blocks/DynamicContent';

import type { JobDetail } from '@/models/Job';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

interface Props {
  jobDetail: JobDetail;
}

function renderListBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (!block || typeof block !== 'object' || !('_type' in block)) return null;

    const { _type, _key } = block;

    switch (_type) {
      case BODY_BLOCKS.STATS_BLOCK:
        return (
          <StatsList
            key={_key}
            firstStat={block.firstStat}
            secondStat={block.secondStat}
            thirdStat={block.thirdStat}
          />
        );
      case BODY_BLOCKS.WYSIWYG_BLOCK:
        return (
          <DynamicContent
            key={_key}
            {...block}
            className={cn(
              block.blockTitle?.isStyle && 'rounded-xl bg-grey-50 p-8'
            )}
            titleClassName={cn('lg:text-xl')}
          />
        );
      case BODY_BLOCKS.FAQ_BLOCK:
        return <FaqBlock key={_key} id={_key} faqs={block.faqs} />;
      case BODY_BLOCKS.CTA_BLOCK:
        return (
          <CtaBlock
            key={_key}
            id={_key}
            title={block.blockTitle?.title || ''}
            description={block.blockTitle?.description || ''}
            buttonText={block.blockTitle?.buttonText || 'Contact Us'}
          />
        );
      default:
        return null;
    }
  });
}

export const Content: React.FC<Props> = ({ jobDetail }) => {
  const pathname = usePathname();
  const toastT = useTranslations('ToastMessage.Link');
  const buttonT = useTranslations('Button&Text');

  const [copied, setCopied] = useState(false);
  const locale = useLocale();

  const handleCopy = () => {
    const link = `${domainURL}${pathname}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        toast.custom((t) => (
          <Alert
            type="success"
            title={toastT('successTitle')}
            as="ghost"
            onClick={() => toast.dismiss(t)}
          >
            {toastT('success')}
          </Alert>
        ));
      })
      .catch(() => {
        setCopied(true);
        toast.custom((t) => (
          <Alert
            type="danger"
            title={toastT('errorTitle')}
            as="ghost"
            onClick={() => toast.dismiss(t)}
          >
            {toastT('error')}
          </Alert>
        ));
      });
  };
  return (
    <div className="top-0 flex w-full flex-col items-start justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:max-w-[570px] lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        <div className="inline-flex flex-col items-start justify-start">
          <RevealItem className="flex w-full flex-col items-start justify-start gap-6 bg-white pb-8">
            <div className="flex w-full flex-col items-start justify-start gap-6">
              <div className="flex flex-col items-start justify-start gap-3 self-stretch">
                <div
                  data-left-icon="false"
                  data-right-icon="false"
                  data-size="Small"
                  data-state="Default"
                  data-type="Primary"
                  className="inline-flex items-center justify-center gap-1.5"
                >
                  <div className="justify-start font-sans text-sm leading-tight font-semibold text-secondary-600">
                    {jobDetail.department}
                  </div>
                </div>
                <h1 className="justify-start self-stretch font-sans text-3xl leading-10 font-semibold text-gray-900">
                  {jobDetail.title}
                </h1>
              </div>
              <div className="inline-flex flex-wrap items-center justify-start gap-3 self-stretch">
                <div className="flex items-center justify-start gap-1.5">
                  <Clock className="size-4 text-black-50" />
                  <div className="justify-start font-sans text-sm leading-tight font-medium text-black-200">
                    {jobDetail.employmentType}
                  </div>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center justify-start gap-1.5">
                  <MapPin className="size-4 text-black-50" />
                  <div className="justify-start font-sans text-sm leading-tight font-medium text-black-200">
                    {jobDetail.location}
                  </div>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center justify-start gap-1.5">
                  <CircleDollarSign className="size-4 text-black-50" />
                  <div className="justify-start font-sans text-sm leading-tight font-medium text-black-200">
                    {jobDetail.salaryMin} - {jobDetail.salaryMax}{' '}
                    {jobDetail.currency}
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <Link
                href={`/${locale}/application/${jobDetail.slug}`}
                className="w-full sm:w-fit"
              >
                <Button
                  as="solid"
                  variant="md"
                  type="primary"
                  className="w-full sm:w-fit"
                >
                  {buttonT('applyNow')}
                </Button>
              </Link>
              <Button
                as="outline"
                onClick={handleCopy}
                variant="md"
                type="primary"
                disabled={copied}
                iconStart={Share2}
                className="w-full sm:w-fit"
              >
                {buttonT('share')}
              </Button>
            </div>
          </RevealItem>
          <div className="flex flex-col items-start justify-start gap-16 self-stretch">
            <div className="flex flex-col items-start justify-start gap-8 self-stretch">
              <div className="h-px self-stretch bg-slate-200" />
              <div className="inline-flex items-start justify-start gap-8 self-stretch">
                <div className="inline-flex w-full max-w-[720px] flex-1 flex-col items-start justify-start gap-8">
                  {renderListBlocks(jobDetail.body)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
