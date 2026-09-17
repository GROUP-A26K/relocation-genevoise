'use client';
import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Env } from '@/libs/env';
import { cn } from '@/libs/utils';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import CtaBlock from '@/components/common/Sanity/Block/CtaBlock';
import { FaqBlock } from '@/components/common/Sanity/Block/FaqBlock';
import { StatsList } from '@/components/common/Sanity/Block/StatsList';
import DynamicContent from '@/components/common/Sanity/DynamicContent';
import { type TBlock, BLOG_BODY_BLOCKS, type IBlogDetail } from '@/models/blog';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

function renderListBlocks(blocks: TBlock[]) {
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

export const Content = (blog: IBlogDetail) => {
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
            placeholder={blog.author.imageLqip ? 'blur' : 'empty'}
            blurDataURL={blog.author.imageLqip}
            width={48}
            height={48}
            className="size-12 rounded-full bg-gray-100 object-cover"
          />
          <div className="gap-0.5 text-base leading-[130%]">
            <BodyText className="text-[length:inherit] leading-[inherit] font-semibold text-gray-700">
              {blog.author.name}
            </BodyText>
            <BodyText variant="sm" className="text-gray-700">
              {blog.author.email}
            </BodyText>
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
