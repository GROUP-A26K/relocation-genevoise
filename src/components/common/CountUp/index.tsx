'use client';

import { useCallback } from 'react';
import ReactCountUp from 'react-countup';
import {
  useInView,
  type IntersectionOptions,
} from 'react-intersection-observer';

import { formatNumber, parseValue } from './utils';

interface ICountUpProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'prefix'
> {
  ref?: React.Ref<HTMLSpanElement>;
  value: string;
  start?: number;
  duration?: number;
  end?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimal?: string;
  decimals?: number;
  inViewOptions?: IntersectionOptions;
}

export default function CountUp({
  ref: forwardedRef,
  value,
  start = 0,
  duration = 2,
  end,
  prefix,
  suffix,
  separator,
  decimal,
  decimals,
  inViewOptions,
  className,
  ...props
}: ICountUpProps) {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    ...inViewOptions,
  });

  const setRefs = useCallback(
    (node: HTMLSpanElement | null) => {
      inViewRef(node);
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [inViewRef, forwardedRef]
  );

  const parsed = parseValue(value);

  if (!parsed) {
    return (
      <span ref={setRefs} className={className} {...props}>
        {value}
      </span>
    );
  }

  const config = {
    end: end ?? parsed.end,
    prefix: prefix ?? parsed.prefix,
    suffix: suffix ?? parsed.suffix,
    separator: separator ?? parsed.separator,
    decimal: decimal ?? parsed.decimal,
    decimals: decimals ?? parsed.decimals,
  };

  return (
    <span ref={setRefs} className={className} {...props}>
      {inView ? (
        <ReactCountUp
          start={start}
          end={config.end}
          duration={duration}
          separator={config.separator}
          decimal={config.decimal}
          decimals={config.decimals}
          prefix={config.prefix}
          suffix={config.suffix}
        />
      ) : (
        `${config.prefix}${formatNumber(start, config)}${config.suffix}`
      )}
    </span>
  );
}
