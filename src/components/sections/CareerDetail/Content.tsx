"use client";
import { DynamicContent } from "@/components/blocks/DynamicContent";
import { StatsList } from "@/components/blocks/Stats";
import Button from "@/components/customs/Button";
import { Env } from "@/libs/Env";
import { cn } from "@/libs/utils";
import { Block, BODY_BLOCKS } from "@/models/Block";
import { JobDetail } from "@/models/Job";
import { CircleDollarSign, Clock, MapPin, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Alert from "@/components/customs/Alert";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { FAQBlog } from "@/components/blocks/FAQ/FAQBlog";
import CtaBlock from "@/components/customs/CtaBlock";

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

interface Props {
  jobDetail: JobDetail;
}

function renderListBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (!block || typeof block !== "object" || !("_type" in block)) return null;

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
              block.blockTitle?.isStyle && "p-8 bg-grey-50 rounded-xl"
            )}
            titleClassName={cn("lg:text-xl")}
          />
        );
      case BODY_BLOCKS.FAQ_BLOCK:
        return <FAQBlog key={_key} id={_key} faqs={block.faqs} />;
      case BODY_BLOCKS.CTA_BLOCK:
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

export const Content: React.FC<Props> = ({ jobDetail }) => {
  const pathname = usePathname();
  const toastT = useTranslations("ToastMessage.Link");
  const buttonT = useTranslations("Button&Text");

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
            title={toastT("successTitle")}
            as="ghost"
            onClick={() => toast.dismiss(t)}
          >
            {toastT("success")}
          </Alert>
        ));
      })
      .catch(() => {
        setCopied(true);
        toast.custom((t) => (
          <Alert
            type="danger"
            title={toastT("errorTitle")}
            as="ghost"
            onClick={() => toast.dismiss(t)}
          >
            {toastT("error")}
          </Alert>
        ));
      });
  };
  return (
    <div className="top-0 flex flex-col items-center justify-center w-full">
      <div className="mx-auto w-full 2xl:max-w-[720px] xl:max-w-[620px] lg:max-w-[570px] max-w-[720px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
        <div className="inline-flex flex-col justify-start items-start">
          <div className="pb-8 bg-white flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div
                  data-left-icon="false"
                  data-right-icon="false"
                  data-size="Small"
                  data-state="Default"
                  data-type="Primary"
                  className="inline-flex justify-center items-center gap-1.5"
                >
                  <div className="justify-start text-secondary-600 text-sm font-semibold font-['Inter'] leading-tight">
                    {jobDetail.department}
                  </div>
                </div>
                <h1 className="self-stretch justify-start text-gray-900 text-3xl font-semibold font-['Inter'] leading-10">
                  {jobDetail.title}
                </h1>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex justify-start items-center gap-1.5">
                  <Clock className="size-4 text-black-50" />
                  <div className="justify-start text-black-200 text-sm font-medium font-['Inter'] leading-tight">
                    {jobDetail.employmentType}
                  </div>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex justify-start items-center gap-1.5">
                  <MapPin className="size-4 text-black-50" />
                  <div className="justify-start text-black-200 text-sm font-medium font-['Inter'] leading-tight">
                    {jobDetail.location}
                  </div>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex justify-start items-center gap-1.5">
                  <CircleDollarSign className="size-4 text-black-50" />
                  <div className="justify-start text-black-200 text-sm font-medium font-['Inter'] leading-tight">
                    {jobDetail.salaryMin} - {jobDetail.salaryMax}{" "}
                    {jobDetail.currency}
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <Link href={`/${locale}/application/${jobDetail.slug}`}>
                <Button as="solid" variant="md" type="primary">
                  {buttonT("applyNow")}
                </Button>
              </Link>
              <Button
                as="outline"
                onClick={handleCopy}
                variant="md"
                type="primary"
                disabled={copied}
                iconStart={Share2}
              >
                {buttonT("share")}
              </Button>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-16">
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
              <div className="self-stretch h-px bg-slate-200" />
              <div className="self-stretch inline-flex justify-start items-start gap-8">
                <div className="flex-1 max-w-[720px] w-full inline-flex flex-col justify-start items-start gap-8">
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
