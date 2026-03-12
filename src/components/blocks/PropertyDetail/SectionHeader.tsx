export interface PropertySectionHeaderProps {
  heading?: string;
  subheading?: string;
  supportHeading?: string;
}

export function PropertySectionHeader({
  heading,
  subheading,
  supportHeading,
}: PropertySectionHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      {heading && (
        <p className="text-yellow-600 text-sm !leading[130%]">{heading}</p>
      )}
      {subheading && (
        <h2 className="font-semibold text-3xl !leading[130%] text-black-500">{subheading}</h2>
      )}
      {supportHeading && (
        <p className="font-normal text-black-200 !leading[130%] text-sm">{supportHeading}</p>
      )}
    </div>
  );
}