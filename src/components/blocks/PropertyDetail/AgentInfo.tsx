import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import BackgroundSVG from '@/assets/img/bg/agent-background.svg';

import type { PropertyAgent } from '@/models/Property';

interface IAgentDetailsProps {
  agent: PropertyAgent;
}

export function PropertyAgentDetails(props: IAgentDetailsProps) {
  const t = useTranslations('PropertiesDetails');
  const { agentName, agentPhone, photoUrl } = props.agent;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-100 bg-yellow-25 p-6">
      <Image
        src={BackgroundSVG}
        alt="Agent background"
        fill
        className="pointer-events-none absolute inset-0 object-cover"
        priority
      />

      <div className="relative flex flex-col gap-4 lg:gap-6">
        <p className="text-xl font-semibold text-black-500 lg:text-2xl">
          {t('agent.title')}
        </p>

        <div className="flex items-center gap-6">
          <Image
            src={photoUrl}
            alt="Agent photo"
            width={80}
            height={80}
            className="h-[60px] w-[60px] rounded-full object-cover lg:h-20 lg:w-20"
          />

          <div className="flex min-w-0 flex-col gap-2 lg:gap-3">
            <p className="text-lg font-semibold text-black-500">{agentName}</p>
            <p className="text-xl font-semibold text-blue-500">{agentPhone}</p>
          </div>
        </div>

        <Link href={`tel:${agentPhone}`} className="w-full">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconStart={Phone}
            className="h-auto! w-full px-4 py-3 leading-[130%]!"
          >
            {t('agent.contactButton')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
