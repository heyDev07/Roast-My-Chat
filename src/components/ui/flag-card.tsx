"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Flag } from "@/lib/types";

interface FlagCardProps {
  flag: Flag;
  index: number;
}

export function FlagCard({ flag, index }: FlagCardProps) {
  const isGreen = flag.type === "green";
  return (
    <motion.div
      initial={{ opacity: 0, x: isGreen ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border",
        isGreen
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-red-500/5 border-red-500/20"
      )}
    >
      <span className={cn(
        "text-lg flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
        isGreen ? "bg-emerald-500/10" : "bg-red-500/10"
      )}>
        {isGreen ? "🟢" : "🔴"}
      </span>
      <span className="text-sm text-white/80">{flag.text}</span>
    </motion.div>
  );
}
