import Image from "next/image";
import { Phone } from "lucide-react";
import BackgroundSVG from "@/assets/img/bg/agent-background.svg";
import Button from "@/components/customs/Button";
import { useTranslations } from "next-intl";
import { PropertyAgent } from "@/models/Property";
import { Link } from "@/libs/i18nNavigation";

interface IAgentDetailsProps {
  agent: PropertyAgent;
}

export function PropertyAgentDetails(props: IAgentDetailsProps) {
  const t = useTranslations("PropertiesDetails");
  const { agentName, agentPhone, photoUrl } = props.agent;

  return (
    <div className="relative rounded-3xl border border-yellow-100 overflow-hidden bg-yellow-25 p-6">
      <Image
        src={BackgroundSVG}
        alt="Agent background"
        fill
        className="absolute inset-0 object-cover pointer-events-none"
        priority
      />

      <div className="relative flex flex-col gap-4 lg:gap-6">
        <p className="text-xl lg:text-2xl font-semibold text-black-500">
          {t("agent.title")}
        </p>

        <div className="flex items-center gap-6">
          <Image
            src={photoUrl}
            alt={"Agent photo"}
            width={80}
            height={80}
            className="w-[60px] h-[60px] lg:w-20 lg:h-20 rounded-full object-cover"
          />

          <div className="flex flex-col gap-2 lg:gap-3 min-w-0">
            <p className="text-lg font-semibold text-black-500">{agentName}</p>
            <p className="text-xl text-blue-500 font-semibold">{agentPhone}</p>
          </div>
        </div>

        <Link href={`tel:${agentPhone}`} className="w-full">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconStart={Phone}
            className="w-full py-3 px-4 !leading-[130%] !h-auto"
          >
            {t("agent.contactButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
