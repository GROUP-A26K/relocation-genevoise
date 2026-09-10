interface IFormSectionHeaderProps {
  title: string;
}

export default function FormSectionHeader({ title }: IFormSectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="7" height="7" className="fill-secondary-500" />
        <rect x="7" y="7.25" width="7" height="7" className="fill-black-500" />
      </svg>
      <h2 className="text-xl leading-[130%]! font-semibold text-black-500">
        {title}
      </h2>
    </div>
  );
}
