import BodyText from '@/components/common/Text/BodyText';
interface IMobileTableProps {
  rows: { cells: string[] }[];
}

export const MobileTable: React.FC<IMobileTableProps> = ({ rows }) => {
  if (!rows?.length) return null;

  const [headerRow, ...bodyRows] = rows;

  return (
    <div className="w-full space-y-4 lg:hidden">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {bodyRows.map((row, i) => (
          <div key={i} className="border-b border-gray-200">
            {row.cells.map((cell, c) =>
              c === 0 ? (
                <BodyText
                  variant="xs"
                  key={c}
                  asChild
                  className="bg-gray-50 px-4 py-3 leading-4 font-semibold"
                >
                  <div>{row.cells[0]}</div>
                </BodyText>
              ) : (
                <div
                  key={c}
                  className="flex items-start border-t border-gray-200"
                >
                  <BodyText
                    variant="xs"
                    asChild
                    className="line-clamp-6 flex w-1/3 px-4 py-3 leading-4 font-semibold"
                  >
                    <span>{headerRow.cells[c]}</span>
                  </BodyText>
                  <BodyText
                    variant="xs"
                    asChild
                    className="line-clamp-6 w-2/3 px-4 py-3 leading-4 font-medium"
                  >
                    <span>{row.cells[c]}</span>
                  </BodyText>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
