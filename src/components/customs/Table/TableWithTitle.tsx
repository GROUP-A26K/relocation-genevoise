import { DesktopTable } from './DesktopTable';
import { MobileTable } from './MobileTable';

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
    <div className="flex flex-col gap-4 py-6 w-full">
      <DesktopTable {...tableContent} />
      <MobileTable {...tableContent} />

      <span className="text-gray-500 text-xs font-medium">{title}</span>
    </div>
  );
};
