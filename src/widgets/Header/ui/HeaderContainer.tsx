"use client";

import { useTheme } from "next-themes";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import ClientOnly from "@/shared/components/ClientOnly";
import clsx from "clsx";

export default function HeaderContainer() {
  const { resolvedTheme } = useTheme();
  return (
    <ClientOnly>
      <header
        className={clsx("z-50 sticky top-0", {
          "bg-white": resolvedTheme === "light",
          "bg-black": resolvedTheme === "dark",
        })}
      >
        <div className="header__container flex justify-between items-center gap-4 px-4 py-2 max-w-7xl mx-auto">
          <HeaderLogo />
          <HeaderNav />
        </div>
      </header>
    </ClientOnly>
  );
}
