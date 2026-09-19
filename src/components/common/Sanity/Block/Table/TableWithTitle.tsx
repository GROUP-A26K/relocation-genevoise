import BodyText from '@/components/common/Text/BodyText';

import { MobileTable } from './MobileTable';
import { DesktopTable } from './DesktopTable';

type TTableContent = {
  rows: { cells: string[] }[];
};

interface ITableWithTitleProps {
  title: string;
  tableContent?: TTableContent;
}

export const TableWithTitle: React.FC<ITableWithTitleProps> = ({
  title,
  tableContent,
}) => {
  if (!tableContent?.rows?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4 py-6">
      <DesktopTable {...tableContent} />
      <MobileTable {...tableContent} />

      <BodyText
        variant="xs"
        asChild
        className="leading-4 font-medium text-gray-500"
      >
        <span>{title}</span>
      </BodyText>
    </div>
  );
};
