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
import { FAQBlog } from '@/components/blocks/FAQ/FAQBlog';
import { Block, BLOG_BODY_BLOCKS, BlogDetail } from '@/models/BLog';
import { BlogContent } from '@/components/blocks/BlogContent/BlogContent';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

function renderListBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (!block || typeof block !== "object" || !("_type" in block)) return null;

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
          <BlogContent
            key={_key}
            {...block}
            className={cn(
              block.blockTitle?.isStyle && "p-8 bg-grey-50 rounded-xl"
            )}
          />
        );
      case BLOG_BODY_BLOCKS.FAQ_BLOCK:
        return <FAQBlog key={_key} id={_key} faqs={block.faqs} />;

      case BLOG_BODY_BLOCKS.CTA_BLOCK:
        return (
          <CtaBlock
            key={_key}
            id={_key}
            title={block.blockTitle?.title || ""}
            description={block.blockTitle?.description || ""}
            buttonText={block.blockTitle?.buttonText || "Contact Us"}
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
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[720px] xl:max-w-[620px] lg:max-w-[570px] max-w-[720px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
        {renderListBlocks(blog.body)}

        <div className="flex lg:flex-row flex-col gap-y-6 justify-between border-t border-grey-100 pt-6 ">
          <div className="flex items-center gap-3">
            <Image
              alt="Author image"
              title="Author image"
              src={blog.author.imageUrl}
              width={48}
              height={48}
              className="h-[48px] w-[48px] rounded-full bg-gray-100 object-cover"
            />
            <div className="text-base !leading-[130%] gap-[2px]">
              <p className="font-semibold text-gray-700">{blog.author.name}</p>
              <p className="text-sm font-normal text-gray-700 !leading-[130%]">
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

            {/* <IconButton
              as="outline"
              icon={() => (
                <Image height={20} width={20} src={X} alt="X logo"></Image>
              )}
              variant="lg"
              type="primary"
            />

            <IconButton
              as="outline"
              icon={Facebook}
              variant="lg"
              type="primary"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
