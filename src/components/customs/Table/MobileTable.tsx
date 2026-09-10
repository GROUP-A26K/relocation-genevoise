import type { FC } from 'react';

interface TableContent {
  rows: { cells: string[] }[];
}

export const MobileTable: FC<TableContent> = ({ rows }) => {
  if (!rows?.length) return null;

  const [headerRow, ...bodyRows] = rows;

  return (
    <div className="w-full space-y-4 lg:hidden">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {bodyRows.map((row, i) => (
          <div key={i} className="border-b border-gray-200">
            {row.cells.map((cell, c) =>
              c === 0 ? (
                <div
                  key={c}
                  className="bg-gray-50 px-4 py-3 text-xs font-semibold text-black-200"
                >
                  {row.cells[0]}
                </div>
              ) : (
                <div
                  key={c}
                  className="flex items-start border-t border-gray-200"
                >
                  <span className="line-clamp-6 flex w-1/3 px-4 py-3 text-xs font-semibold text-black-200">
                    {headerRow.cells[c]}
                  </span>
                  <span className="line-clamp-6 w-2/3 px-4 py-3 text-xs font-medium text-black-200">
                    {row.cells[c]}
                  </span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
