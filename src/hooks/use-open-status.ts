import { useEffect, useState } from "react";

interface UseOpenStatusOptions {
  timezone?: string;
  openHour?: number;
  closeHour?: number;
  interval?: number;
}

const DEFAULT_OPEN_HOUR = 9;
const DEFAULT_CLOSE_HOUR = 18;
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

  const hourFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  });
  const hourParts = hourFormatter.formatToParts(date);
  const hourPart = hourParts.find((part) => part.type === "hour");
  const hour = parseInt(hourPart?.value ?? "0", 10);

  const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: timezone,
  });
  const weekday = weekdayFormatter.format(date);

  const isWeekday = weekday !== "Sat" && weekday !== "Sun";

  return isWeekday && hour >= openHour && hour < closeHour;
};

export const useOpenStatus = ({
  timezone,
  openHour = DEFAULT_OPEN_HOUR,
  closeHour = DEFAULT_CLOSE_HOUR,
  interval = DEFAULT_INTERVAL,
}: UseOpenStatusOptions) => {
  const [isOpen, setIsOpen] = useState(() =>
    isServiceOpen(timezone, openHour, closeHour)
  );

  useEffect(() => {
    if (!timezone || typeof window === "undefined") {
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
