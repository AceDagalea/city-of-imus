"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

export default function StatCard({ value, label, suffix = "", decimals = 0 }: StatCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });
  const displayValue = useCountUp({ end: value, decimals, isActive: isVisible });

  return (
    <div
      ref={ref}
      className="group rounded-xl bg-imus-navy p-6 text-center transition-all duration-300 hover:border-b-4 hover:border-imus-green"
    >
      <p className="text-4xl font-bold text-imus-green">
        {displayValue}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wide text-white/80">{label}</p>
    </div>
  );
}
