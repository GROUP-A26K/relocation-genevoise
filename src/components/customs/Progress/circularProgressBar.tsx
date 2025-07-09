import React from 'react';
import clsx from 'clsx';

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  className?: string;
};

export const CircularProgressBar: React.FC<Props> = ({
  value,
  size = 200,
  strokeWidth = 8,
  trackColor = '#e5e7eb',
  progressColor = '#50B370',
  className,
}) => {
  const pct = Math.min(Math.max(value, 0), 100);
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <div
      className={clsx('flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="rotate-[-90deg]"
        viewBox="0 0 100 100"
        width={size}
        height={size}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .4s ease' }}
        />
      </svg>

      {/* <span className="absolute text-3xl font-semibold text-gray-900 dark:text-gray-50">
        {pct}%
      </span> */}
    </div>
  );
};
