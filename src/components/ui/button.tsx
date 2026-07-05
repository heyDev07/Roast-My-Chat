"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}

const variantStyles = {
  primary:
    "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30",
  secondary:
    "bg-white/5 hover:bg-white/10 text-white border border-white/10",
  ghost: "hover:bg-white/5 text-white/70 hover:text-white",
  outline:
    "border border-white/10 text-white hover:bg-white/5",
  danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      disabled,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn("inline-block", disabled && "pointer-events-none")}
      >
        <button
          ref={ref}
          type={type}
          disabled={disabled || loading}
          onClick={onClick}
          className={cn(
            "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
            "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : icon ? (
            icon
          ) : null}
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
