"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import ClientOnly from "./ClientOnly";

type TButtonProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "outline" | "filled";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant,
  ...props
}: TButtonProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ClientOnly>
      <button
        className={clsx(
          "border-2 px-4 py-2 rounded cursor-pointer",
          className,
          {
            "bg-white text-black border-white":
              resolvedTheme === "dark" && variant === "filled",
            "bg-black text-white border-black":
              resolvedTheme === "light" && variant === "filled",
            "bg-transparent": variant === "outline",
          }
        )}
        {...props}
      >
        {props.children}
      </button>
    </ClientOnly>
  );
}
