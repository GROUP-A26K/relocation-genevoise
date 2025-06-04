'use client';

import { BlogContent } from '@/components/blocks/BlogContent/BlogContent';
import { StatsList } from '@/components/blocks/Stats';
import Button from '@/components/customs/Button';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { Block, BlogDetail } from '@/models/BLog';
import { cn } from '@/libs/utils';
import { Env } from '@/libs/Env';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import Alert from '@/components/customs/Alert';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
const domainURL = Env.NEXT_PUBLIC_SITE_URL;
function renderListBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (typeof block === 'object' && block !== null && '_type' in block) {
      switch (block._type) {
        case 'statsBlock':
          return (
            <StatsList
              key={block._key}
              firstStat={{
                value: block.firstStat?.value,
                label: block.firstStat?.label,
              }}
              secondStat={{
                value: block.secondStat?.value,
                label: block.secondStat?.label,
              }}
              thirdStat={{
                value: block.thirdStat?.value,
                label: block.thirdStat?.label,
              }}
            />
          );
        case 'wysiwygBlock':
          return (
            <BlogContent
              key={block._key}
              {...block}
              className={cn(
                block.blockTitle?.isStyle && 'p-8 bg-grey-50 rounded-xl'
              )}
            />
          );
        default:
          return null;
      }
    }
    return null;
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
