import { MobileTable } from './MobileTable';
import { DesktopTable } from './DesktopTable';

interface TableContent {
  rows: { cells: string[] }[];
}

interface Props {
  title: string;
  tableContent?: TableContent;
}

export const TableWithTitle: React.FC<Props> = ({ title, tableContent }) => {
  if (!tableContent?.rows?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4 py-6">
      <DesktopTable {...tableContent} />
      <MobileTable {...tableContent} />

      <span className="text-xs font-medium text-gray-500">{title}</span>
    </div>
  );
};
