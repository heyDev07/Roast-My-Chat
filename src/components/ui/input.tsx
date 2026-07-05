"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-white/60 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl",
            "text-white placeholder:text-white/20",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50",
            "transition-all duration-200",
            error && "border-red-500/50 focus:ring-red-500/50",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
