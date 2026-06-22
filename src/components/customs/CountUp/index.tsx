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
  const decimalPart = raw.split(".")[1];

  return {
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
    end: Number.parseFloat(raw.replaceAll(",", "")),
    decimals: decimalPart ? decimalPart.length : 0,
    separator: raw.includes(",") ? "," : "",
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

  const { prefix, suffix, end, decimals, separator } = parsed;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {inView ? (
        <ReactCountUp
          end={end}
          duration={duration}
          decimals={decimals}
          separator={separator}
        />
      ) : (
        (0).toFixed(decimals)
      )}
      {suffix}
    </span>
  );
}
