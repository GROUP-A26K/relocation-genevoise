import { useEffect, useState } from 'react';

import { ORGANIZATION } from '@/constants/seo';

type TUseOpenStatusOptions = {
  timezone?: string;
  openHour?: number;
  closeHour?: number;
  interval?: number;
};

const { openingHours } = ORGANIZATION;
const OPEN_DAYS: readonly string[] = openingHours.dayOfWeek;
const DEFAULT_OPEN_HOUR = Number.parseInt(openingHours.opens, 10);
const DEFAULT_CLOSE_HOUR = Number.parseInt(openingHours.closes, 10);
const DEFAULT_INTERVAL = 60_000;

export const isServiceOpen = (
  timezone: string | undefined,
  openHour = DEFAULT_OPEN_HOUR,
  closeHour = DEFAULT_CLOSE_HOUR,
  date = new Date()
) => {
  if (!timezone) {
    return false;
  }

  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: timezone,
  });
  const hourParts = hourFormatter.formatToParts(date);
  const hourPart = hourParts.find((part) => part.type === 'hour');
  const hour = Number.parseInt(hourPart?.value ?? '0', 10);

  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: timezone,
  });
  const weekday = weekdayFormatter.format(date);

  return OPEN_DAYS.includes(weekday) && hour >= openHour && hour < closeHour;
};

export const useOpenStatus = ({
  timezone,
  openHour = DEFAULT_OPEN_HOUR,
  closeHour = DEFAULT_CLOSE_HOUR,
  interval = DEFAULT_INTERVAL,
}: TUseOpenStatusOptions) => {
  const [isOpen, setIsOpen] = useState(() =>
    isServiceOpen(timezone, openHour, closeHour)
  );

  useEffect(() => {
    if (!timezone || typeof window === 'undefined') {
      setIsOpen(false);
      return;
    }

    const updateStatus = () =>
      setIsOpen(isServiceOpen(timezone, openHour, closeHour));

    updateStatus();
    const intervalId = window.setInterval(updateStatus, interval);

    return () => window.clearInterval(intervalId);
  }, [timezone, openHour, closeHour, interval]);

  return isOpen;
};
