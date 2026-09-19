import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

interface ICompanyCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const CompanyCard: React.FC<ICompanyCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-grey-50 bg-grey-50 p-6 leading-none no-underline outline-hidden transition-colors select-none hover:border-secondary-500 hover:bg-white lg:gap-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary-500 lg:h-12 lg:w-12">
        <div className="p-2.5 lg:p-3">
          {Icon && <Icon className="h-5 w-5 text-black-500 lg:h-6 lg:w-6" />}
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <BodyText
          asChild
          className="flex flex-col gap-1 text-[length:inherit] leading-[inherit] font-[number:inherit] text-black-500 lg:gap-3"
        >
          <div>
            <HeadingText as="h3" className="text-xl text-inherit">
              {title}
            </HeadingText>
            {description && (
              <BodyText variant="sm" className="lg:text-sm">
                {description}
              </BodyText>
            )}
          </div>
        </BodyText>
      </div>
    </div>
  );
};
