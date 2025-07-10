"use client";

import { useTheme } from "next-themes";
import { IoMdMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { clsx } from "clsx";
import ClientOnly from "@/shared/components/ClientOnly";
import { motion } from "motion/react";

type TThemeSwitcherProps = {
  className?: string;
};

export default function ThemeSwitcher({ className }: TThemeSwitcherProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <ClientOnly>
      <button
        className={clsx(
          "w-10 h-10 rounded border-2 cursor-pointer",
          {
            "border-white": resolvedTheme === "dark",
            "border-black": resolvedTheme === "light",
          },
          className
        )}
        aria-label="Theme Switcher"
        onClick={toggleTheme}
      >
        <motion.span
          layout
          whileHover={{ rotate: "45deg" }}
          whileTap={{ rotate: "90deg" }}
          transition={{ duration: 0.2 }}
          className="w-full h-full flex items-center justify-center"
        >
          {resolvedTheme === "light" ? (
            <IoMdMoon fontSize="24px" />
          ) : (
            <IoIosSunny fontSize="24px" />
          )}
        </motion.span>
      </button>
    </ClientOnly>
  );
}
