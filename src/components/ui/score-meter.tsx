"use client";

import { motion } from "framer-motion";
import { cn, scoreToColor, scoreToLabel } from "@/lib/utils";

interface ScoreMeterProps {
  label: string;
  score: number;
  icon?: string;
  color?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreMeter({
  label,
  score,
  icon,
  color,
  delay = 0,
  size = "md",
  showLabel = true,
}: ScoreMeterProps) {
  const barColor = color || scoreToColor(score);
  const statusLabel = scoreToLabel(score);

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm font-medium text-white/80">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {showLabel && (
            <span className="text-xs text-white/40">{statusLabel}</span>
          )}
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: barColor }}
          >
            {score}%
          </span>
        </div>
      </div>
      <div className={cn("w-full rounded-full bg-white/5 overflow-hidden", heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            duration: 1.2,
            delay: delay + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn("rounded-full", heights[size])}
          style={{
            background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
            boxShadow: `0 0 12px ${barColor}44`,
          }}
        />
      </div>
    </motion.div>
  );
}
