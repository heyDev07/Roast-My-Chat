"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Badge as BadgeType } from "@/lib/types";

interface BadgeProps {
  badge: BadgeType;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

export function Badge({ badge, delay = 0, size = "md" }: BadgeProps) {
  const sizeClasses = {
    sm: "p-2 text-xs",
    md: "p-3 text-sm",
    lg: "p-4 text-base",
  };

  const iconSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={cn(
        "glass rounded-xl flex flex-col items-center gap-1.5 text-center cursor-default",
        "hover:border-purple-500/30 transition-all duration-300",
        sizeClasses[size]
      )}
    >
      <span className={iconSizes[size]}>{badge.icon}</span>
      <span className="font-semibold text-white/90 leading-tight">
        {badge.name}
      </span>
      <span className="text-xs text-white/40 leading-tight">
        {badge.description}
      </span>
    </motion.div>
  );
}
