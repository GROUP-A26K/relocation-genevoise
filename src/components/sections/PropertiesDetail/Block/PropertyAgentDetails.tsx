import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import { getTelHref } from '@/utils/contact';
import Button from '@/components/common/Button';
import BodyText from '@/components/common/Text/BodyText';
import { AnimatedGridPattern } from '@/components/ui/magicui/animated-grid-pattern';

import type { IPropertyAgent } from '@/models/property';

interface IPropertyAgentDetailsProps {
  agent: IPropertyAgent;
}

export function PropertyAgentDetails({ agent }: IPropertyAgentDetailsProps) {
  const t = useTranslations('PropertiesDetails');
  const imageT = useTranslations('Images');

  const { agentName, agentPhone, photoUrl, photoLqip } = agent;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-yellow-100 bg-yellow-25 p-6">
      <div className="pointer-events-none absolute -top-[127px] left-[60px] size-[500px]">
        <AnimatedGridPattern
          numSquares={15}
          maxOpacity={0.5}
          duration={3}
          width={50}
          height={50}
          className={cn(
            'stroke-yellow-100/50 text-yellow-100',
            'mask-[linear-gradient(to_left,black,transparent_99%)]'
          )}
        />
      </div>

      <div className="relative flex flex-col gap-4 lg:gap-6">
        <BodyText
          variant="xl"
          className="leading-7 font-semibold text-black-500 lg:text-2xl lg:leading-8"
        >
          {t('agent.title')}
        </BodyText>

        <div className="flex items-center gap-6">
          <Image
            src={photoUrl}
            placeholder={photoLqip ? 'blur' : 'empty'}
            blurDataURL={photoLqip}
            alt={photoUrl ? imageT('common.agent') : imageT('common.photo')}
            title={photoUrl ? imageT('common.agent') : imageT('common.photo')}
            width={80}
            height={80}
            className="h-[60px] w-[60px] rounded-full object-cover lg:h-20 lg:w-20"
          />

          <div className="flex min-w-0 flex-col gap-2 lg:gap-3">
            <BodyText
              variant="lg"
              className="leading-7 font-semibold text-black-500"
            >
              {agentName}
            </BodyText>
            <BodyText
              variant="xl"
              className="leading-7 font-semibold text-blue-500"
            >
              {agentPhone}
            </BodyText>
          </div>
        </div>

        <Link href={getTelHref(agentPhone)} className="w-full">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconStart={Phone}
            className="h-auto w-full px-4 py-3 leading-[130%]"
          >
            {t('agent.contactButton')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
