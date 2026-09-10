import {
  Table as TableShadcn,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableContent {
  rows: { cells: string[] }[];
}
export const DesktopTable: React.FC<TableContent> = (prop) => {
  const [headerRow, ...bodyRows] = prop.rows;
  return (
    <div className="hidden w-full overflow-x-auto rounded-2xl border border-gray-200 lg:block">
      <div className="inline-block min-w-full overflow-hidden bg-white">
        <TableShadcn className="w-full">
          <TableHeader className="bg-gray-50 text-xs leading-[130%]! font-semibold text-black-200">
            <TableRow>
              {headerRow.cells.map((c, i) => (
                <TableHead key={i} className="px-6 py-3">
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {bodyRows.map((row, r) => (
              <TableRow
                key={r}
                className="max-w-[260px] text-sm leading-[130%]! font-normal text-black-200"
              >
                {row.cells.map((cell, c) => (
                  <TableCell
                    key={c}
                    className={`px-6 py-4 ${
                      c === 0 ? 'min-w-[180px] font-medium' : 'min-w-[268px]'
                    }`}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableShadcn>
      </div>
    </div>
  );
};
