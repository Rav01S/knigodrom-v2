"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";
import ClientOnly from "./ClientOnly";

type TButtonLinkProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  variant?: "outline" | "filled";
} & React.LinkHTMLAttributes<HTMLAnchorElement>;

export default function ButtonLink({
  className,
  children,
  href,
  variant,
  ...props
}: TButtonLinkProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ClientOnly>
      <Link
        href={href}
        className={clsx(
          "inline-block border-2 px-4 py-2 rounded cursor-pointer text-center",
          {
            "bg-white text-black border-white":
              resolvedTheme === "dark" && variant === "filled",
            "bg-black text-white border-black":
              resolvedTheme === "light" && variant === "filled",
            "bg-transparent": variant === "outline",
          },
          className
        )}
        {...props}
      >
        {children}
      </Link>
    </ClientOnly>
  );
}
