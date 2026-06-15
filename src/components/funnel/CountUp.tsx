import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  thousands?: boolean;
  className?: string;
}

/** Editorial count-up — triggers once when in view, ease-out cubic. */
const CountUp = ({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  thousands = false,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const start = performance.now();
          let raf = 0;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * to));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, started]);

  const formatted = thousands
    ? Number(value).toLocaleString("it-IT")
    : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default CountUp;
