// components/Button.tsx
"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
// Removed ClientOnly as useTheme already makes it a client component

type TButtonProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "outline" | "filled" | "ghost" | "danger"; // Added 'ghost' and 'danger' variants
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant = "outline",
  ...props
}: TButtonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center", // For centering content and icons
        "px-5 py-2.5 rounded-lg font-medium text-base", // Consistent padding, border-radius, font
        "transition-all duration-200 ease-in-out", // Smooth transitions for all states
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black", // Basic focus ring

        // --- Disabled State (Applied universally) ---
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "disabled:border-transparent disabled:shadow-none", // Remove borders/shadows for disabled

        // --- Base Styles for all variants ---
        "border-2 cursor-pointer", // All buttons have a border

        // --- Filled Variant ---
        variant === "filled" && [
          isDark
            ? "bg-white text-black border-white hover:bg-gray-200 active:bg-gray-300"
            : "bg-black text-white border-black hover:bg-gray-800 active:bg-gray-700",
          "shadow-md", // Add a subtle shadow to filled buttons
        ],

        // --- Outline Variant ---
        variant === "outline" && [
          isDark
            ? "text-white border-white hover:bg-white hover:text-black active:bg-gray-200 active:text-black"
            : "text-black border-black hover:bg-black hover:text-white active:bg-gray-800 active:text-white",
        ],

        // --- Ghost Variant (New) ---
        variant === "ghost" && [
          "border-transparent", // No visible border
          isDark
            ? "text-white hover:bg-gray-800 active:bg-gray-700"
            : "text-black hover:bg-gray-100 active:bg-gray-200",
        ],

        // --- Danger Variant (New) ---
        variant === "danger" && [
          "bg-red-600 text-white border-red-600",
          "hover:bg-red-700 active:bg-red-800",
          "shadow-md",
        ],
        
        className // Custom classes always apply last
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}