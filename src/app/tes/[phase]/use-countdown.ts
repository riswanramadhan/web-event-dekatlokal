"use client";

import { useEffect, useRef, useState } from "react";

function secondsUntil(target: number): number {
  return Math.max(0, Math.round((target - Date.now()) / 1000));
}

/**
 * Seconds left, derived from the deadline the database issued.
 *
 * It counts down from `expiresAt` minus the current clock, not from a local
 * total started at mount, so refreshing the page cannot hand anyone extra time.
 *
 * `onExpire` fires once, from the interval rather than from an effect body, so
 * reaching zero does not schedule a state update during render.
 */
export function useCountdown(expiresAt: string, onExpire: () => void): number {
  const target = new Date(expiresAt).getTime();
  const [remaining, setRemaining] = useState(() => secondsUntil(target));
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  // Kept current in an effect rather than during render: the interval below
  // must call the latest callback without restarting every second.
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    function tick() {
      const next = secondsUntil(target);
      setRemaining(next);

      if (next === 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
    }

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  return remaining;
}

export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
