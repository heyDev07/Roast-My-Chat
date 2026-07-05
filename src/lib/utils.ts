import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const FREE_REPORT_LIMIT = 100;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function scoreToColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#84cc16";
  if (score >= 40) return "#eab308";
  if (score >= 20) return "#f97316";
  return "#ef4444";
}

export function scoreToLabel(score: number): string {
  if (score >= 90) return "Legendary";
  if (score >= 75) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  if (score >= 20) return "Poor";
  return "Disaster";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
