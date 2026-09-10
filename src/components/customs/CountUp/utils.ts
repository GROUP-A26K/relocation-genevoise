export interface IParsedValue {
  end: number;
  prefix: string;
  suffix: string;
  separator: string;
  decimal: string;
  decimals: number;
}

export function parseValue(value: string): IParsedValue | null {
  const firstDigit = value.search(/\d/);

  if (firstDigit === -1) {
    return null;
  }

  const lastDigit =
    value.length -
    1 -
    [...value].reverse().findIndex((char) => /\d/.test(char));

  const prefix = value.slice(0, firstDigit);
  const suffix = value.slice(lastDigit + 1);
  const numeric = value.slice(firstDigit, lastDigit + 1);

  const hasComma = numeric.includes(',');
  const hasDot = numeric.includes('.');

  let separator = '';
  let decimal = '.';

  if (hasComma && hasDot) {
    if (numeric.lastIndexOf(',') > numeric.lastIndexOf('.')) {
      separator = '.';
      decimal = ',';
    } else {
      separator = ',';
      decimal = '.';
    }
  } else if (hasComma) {
    separator = ',';
    decimal = '.';
    const parts = numeric.split(',');

    if (parts.length === 2 && parts[1].length !== 3) {
      separator = '';
      decimal = ',';
    }
  } else if (hasDot) {
    separator = ',';
    decimal = '.';
    const parts = numeric.split('.');

    if (parts.length === 2 && parts[1].length === 3) {
      separator = '.';
      decimal = ',';
    }
  }

  let cleaned = numeric;
  if (separator) cleaned = cleaned.split(separator).join('');
  cleaned = cleaned.replace(decimal, '.');

  const end = Number.parseFloat(cleaned);

  if (Number.isNaN(end)) {
    return null;
  }

  const dotIndex = cleaned.indexOf('.');
  const decimals = dotIndex === -1 ? 0 : cleaned.length - dotIndex - 1;

  return { end, prefix, suffix, separator, decimal, decimals };
}

export function formatNumber(
  num: number,
  {
    separator,
    decimal,
    decimals,
  }: Pick<IParsedValue, 'separator' | 'decimal' | 'decimals'>
): string {
  const fixed = num.toFixed(decimals);
  const [intPart, fracPart] = fixed.split('.');
  const grouped = separator
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : intPart;

  return fracPart == null ? grouped : `${grouped}${decimal}${fracPart}`;
}
