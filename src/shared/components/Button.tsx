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
  variant = "outline",
  ...props
}: TButtonProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ClientOnly>
      <button
        className={clsx(
          "inline-block border-2 px-4 py-2 rounded cursor-pointer text-center transition-colors disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-default",
          variant === "filled" && {
            "bg-white text-black border-white": resolvedTheme === "dark",
            "bg-black text-white border-black": resolvedTheme === "light",
          },
          variant === "outline" && {
            "hover:bg-white hover:text-black border-white":
              resolvedTheme === "dark",
            "hover:bg-black hover:text-white border-black":
              resolvedTheme === "light",
          },
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    </ClientOnly>
  );
}
