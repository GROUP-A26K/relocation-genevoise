export function getText(inputText: string) {
  return inputText.replace(/\(\(([^)]+)\)\)/g, '$1');
}

export const TextWithStrong = (inputText: string) => {
  const segments = inputText.split(/\(\(([^)]+)\)\)/g);

  return (
    <>
      {segments.map((segment, index) => {
        if (index % 2 === 1) {
          return (
            <strong className="font-inherit" key={index}>
              {segment}
            </strong>
          );
        }
        return segment;
      })}
    </>
  );
};
