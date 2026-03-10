type Item = {
  label?: string;
  value?: string | number;
  icon?: string;
  unit?: string;
};

interface Props {
  items: Item[];
  iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;
  columns?: number;
}

export const PropertyDetailTable = ({ items, iconMap, columns = 3 }: Props) => {
  const rows = Math.ceil(items.length / columns);
  const filledItems = [
    ...items,
    ...Array(rows * columns - items.length).fill({}),
  ];

  // Group items into rows
  const groupedRows = [];
  for (let i = 0; i < filledItems.length; i += columns) {
    groupedRows.push(filledItems.slice(i, i + columns));
  }

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-none">
      <table className="w-full border-collapse">
        <tbody>
          {groupedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => {
                const Icon = item.icon && iconMap[item.icon];
                const isLastRow = rowIndex === groupedRows.length - 1;
                const isLastCol = colIndex === row.length - 1;
                
                return (
                  <td
                    key={colIndex}
                    className={`p-6 border-gray-100 ${!isLastCol ? 'border-r' : ''} ${!isLastRow ? 'border-b' : ''}`}
                  >
                    {item.label ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-black-500">
                          {Icon && <Icon className="lg:h-6 lg:w-6 w-5 h-5 text-blue-500" />}
                          <span className="text-base font-normal !leading-[130%]">{item.label}</span>
                        </div>
                        <span className="font-semibold text-black-500 text-base !leading-[130%]">
                          {item.value} {(item.unit) ?? ""}
                        </span>
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}