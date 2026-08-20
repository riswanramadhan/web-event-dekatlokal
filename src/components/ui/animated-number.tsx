"use client";

import { useEffect, useRef, useState } from "react";

export interface AnimatedNumberProps {
  readonly value: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly durationMs?: number;
  readonly className?: string;
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

/**
 * A small client leaf for evidence-backed KPI values.
 *
 * The final value is always exposed through the accessible name and print
 * fallback. Only the visual number counts up, once, when it enters view.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 900,
  className,
}: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const finalLabel = `${prefix}${formatNumber(value, decimals)}${suffix}`;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const requestFrame = window.requestAnimationFrame.bind(window);
    const cancelFrame = window.cancelAnimationFrame.bind(window);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    if (!("IntersectionObserver" in window)) {
      frameRef.current = requestFrame(() => {
        setDisplayValue(value);
        frameRef.current = null;
      });
      return () => {
        if (frameRef.current !== null) {
          cancelFrame(frameRef.current);
        }
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();
        const startedAt = performance.now();

        const tick = (timestamp: number) => {
          const elapsed = timestamp - startedAt;
          const progress = Math.min(1, elapsed / durationMs);
          setDisplayValue(value * easeOutCubic(progress));

          if (progress < 1) {
            frameRef.current = requestFrame(tick);
          } else {
            frameRef.current = null;
          }
        };

        frameRef.current = requestFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelFrame(frameRef.current);
      }
    };
  }, [durationMs, value]);

  return (
    <span
      ref={elementRef}
      className={`tabular-nums ${className ?? ""}`.trim()}
    >
      <span className="sr-only">{finalLabel}</span>
      <span
        aria-hidden="true"
        className="print:hidden motion-reduce:hidden"
      >
        {prefix}
        {formatNumber(displayValue, decimals)}
        {suffix}
      </span>
      <span
        aria-hidden="true"
        className="hidden print:inline motion-reduce:inline"
      >
        {finalLabel}
      </span>
    </span>
  );
}
