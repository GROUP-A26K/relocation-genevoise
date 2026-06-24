"use client";

import ReactCountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface ICountUpProps {
  value: string;
  duration?: number;
  threshold?: number;
  className?: string;
}

function parseValue(value: string) {
  const match = new RegExp(/[\d.,]+/).exec(value);

  if (!match) {
    return null;
  }

  const raw = match[0];
  const start = match.index ?? 0;

  const lastSep = Math.max(raw.lastIndexOf(","), raw.lastIndexOf("."));
  const trailing = lastSep >= 0 ? raw.slice(lastSep + 1) : "";
  const hasDecimal = lastSep >= 0 && trailing.length !== 3;

  const decimal = hasDecimal ? raw[lastSep] : ".";
  const decimals = hasDecimal ? trailing.length : 0;
  const integerPart = hasDecimal ? raw.slice(0, lastSep) : raw;
  const separator = integerPart.includes(",")
    ? ","
    : integerPart.includes(".")
      ? "."
      : "";

  const numeric = hasDecimal
    ? `${integerPart.replace(/[.,]/g, "")}.${trailing}`
    : raw.replace(/[.,]/g, "");

  return {
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
    end: Number.parseFloat(numeric),
    decimals,
    separator,
    decimal,
  };
}

export default function CountUp({
  value,
  duration = 2,
  threshold = 0.3,
  className,
}: ICountUpProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const parsed = parseValue(value);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const { prefix, suffix, end, decimals, separator, decimal } = parsed;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {inView ? (
        <ReactCountUp
          end={end}
          duration={duration}
          decimals={decimals}
          separator={separator}
          decimal={decimal}
        />
      ) : (
        (0).toFixed(decimals).replace(".", decimal)
      )}
      {suffix}
    </span>
  );
}
