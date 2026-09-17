import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

interface IInfoContactCardProps {
  title: string;
  description?: string;
  info?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const InfoContactCard: React.FC<IInfoContactCardProps> = ({
  title,
  description,
  info,
  icon: Icon,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl leading-none no-underline outline-hidden transition-colors select-none lg:gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 lg:h-12 lg:w-12">
        <div className="p-2.5 lg:p-3">
          {Icon && <Icon className="h-5 w-5 text-primary-500 lg:h-6 lg:w-6" />}
        </div>
      </div>

      <div className="flex flex-col gap-1 text-center text-black-500 lg:gap-1.5">
        <HeadingText as="h2" className="text-xl font-semibold text-inherit">
          {title}
        </HeadingText>
        <BodyText
          title={description ?? '\u00A0'}
          className="line-clamp-1 lg:text-sm"
        >
          {description ?? '\u00A0'}
        </BodyText>
      </div>

      <BodyText className="text-center font-semibold text-yellow-600">
        {info}
      </BodyText>
    </div>
  );
};
