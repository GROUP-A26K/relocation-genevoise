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
    <div className="w-full overflow-x-auto lg:block hidden rounded-2xl border border-gray-200">
      <div className="inline-block min-w-full  overflow-hidden bg-white ">
        <TableShadcn className="w-full">
          <TableHeader className="bg-gray-50 text-xs font-semibold !leading-[130%] text-black-200">
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
                className="text-sm font-normal !leading-[130%] text-black-200 max-w-[260px]"
              >
                {row.cells.map((cell, c) => (
                  <TableCell
                    key={c}
                    className={`px-6 py-4 ${
                      c === 0 ? 'font-medium min-w-[180px]' : 'min-w-[268px]'
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
