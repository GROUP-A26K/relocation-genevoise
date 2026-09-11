'use client';

import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Env } from '@/libs/Env';
import { cn } from '@/libs/utils';
import Alert from '@/components/customs/Alert';
import Button from '@/components/customs/Button';
import CtaBlock from '@/components/customs/CtaBlock';
import { StatsList } from '@/components/blocks/Stats';
import { RevealItem } from '@/components/customs/Reveal';
import { FaqBlock } from '@/components/blocks/Faq/FaqBlock';
import { DynamicContent } from '@/components/blocks/DynamicContent';
import { type Block, BLOG_BODY_BLOCKS, type BlogDetail } from '@/models/BLog';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

function renderListBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (!block || typeof block !== 'object' || !('_type' in block)) return null;

    const { _type, _key } = block;

    switch (_type) {
      case BLOG_BODY_BLOCKS.STATS_BLOCK:
        return (
          <StatsList
            key={_key}
            firstStat={block.firstStat}
            secondStat={block.secondStat}
            thirdStat={block.thirdStat}
          />
        );
      case BLOG_BODY_BLOCKS.WYSIWYG_BLOCK:
        return (
          <DynamicContent
            key={_key}
            {...block}
            className={cn(
              block.blockTitle?.isStyle && 'rounded-xl bg-grey-50 p-8'
            )}
          />
        );
      case BLOG_BODY_BLOCKS.FAQ_BLOCK:
        return <FaqBlock key={_key} id={_key} faqs={block.faqs} />;

      case BLOG_BODY_BLOCKS.CTA_BLOCK:
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

export const Content = (blog: BlogDetail) => {
  const t = useTranslations('BlogDetail');
  const toastT = useTranslations('ToastMessage.Link');

  const pathname = usePathname();

  const [copied, setCopied] = useState(false);

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
    <div className="flex w-full max-w-180 flex-col gap-x-8 gap-y-8 xl:max-w-180">
      {renderListBlocks(blog.body)}

      <RevealItem className="flex flex-col justify-between gap-y-6 border-t border-grey-100 pt-6 lg:flex-row">
        <div className="flex items-center gap-3">
          <Image
            alt="Author image"
            title="Author image"
            src={blog.author.imageUrl}
            width={48}
            height={48}
            className="size-12 rounded-full bg-gray-100 object-cover"
          />
          <div className="gap-0.5 text-base leading-[130%]!">
            <p className="font-semibold text-gray-700">{blog.author.name}</p>
            <p className="text-sm leading-[130%]! font-normal text-gray-700">
              {blog.author.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            as="outline"
            iconStart={Copy}
            onClick={handleCopy}
            variant="md"
            type="primary"
            disabled={copied}
          >
            {t('buttonCopy')}
          </Button>
        </div>
      </RevealItem>
    </div>
  );
};
