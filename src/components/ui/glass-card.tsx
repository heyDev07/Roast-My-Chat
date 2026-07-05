"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        glow && "glow-sm",
        hover && "hover:border-white/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassCardStatic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("glass rounded-2xl p-6", className)}>{children}</div>;
}
