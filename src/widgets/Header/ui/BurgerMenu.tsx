"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";
import useOutsideElementClick from "@/shared/hooks/useOutsideElementClick";

type TBurgerMenu = {
  isAuthed: boolean;
};

export default function BurgerMenu({ isAuthed }: TBurgerMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideElementClick(ref, () => setIsOpen(false));

  return (
    <>
      <button
        className="p-4 cursor-pointer"
        aria-label="Open menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RxHamburgerMenu fontSize="24px" />
      </button>
      <div
        ref={ref}
        className={clsx(
          "fixed top-0 h-screen w-64 transition-all shadow-lg z-50",
          {
            "-right-full": !isOpen,
            "right-0": isOpen,
            "bg-white": resolvedTheme === "light",
            "bg-black": resolvedTheme === "dark",
          }
        )}
      >
        <div className="burger__container h-full relative flex flex-col gap-4 py-2 px-4 ">
          <button
            aria-label="Close menu"
            className="ms-auto p-4 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdClose fontSize="24px" />
          </button>
          <ul className="burger__nav-list flex flex-col gap-4">
            {isAuthed && (
              <>
                <li>
                  <Link
                    className="inline-block w-full text-center px-4 py-2"
                    href="/profile"
                  >
                    Профиль
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block w-full text-center px-4 py-2"
                    href="/settings"
                  >
                    Настройки
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block w-full text-center px-4 py-2"
                    href="/sign-out"
                  >
                    Выход
                  </Link>
                </li>
              </>
            )}
            {!isAuthed && (
              <>
                <li>
                  <Link
                    className="inline-block w-full text-center px-4 py-2"
                    href="/sign-in"
                  >
                    Вход
                  </Link>
                </li>
                <li>
                  <Link
                    className={clsx(
                      "border-2 inline-block w-full text-center px-4 py-1.5 rounded transition-colors",
                      {
                        "border-white text-black bg-white":
                          resolvedTheme === "dark",
                        "border-black text-white bg-black":
                          resolvedTheme === "light",
                      }
                    )}
                    href="/sign-up"
                  >
                    Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ThemeSwitcher className="absolute left-4 bottom-4" />
        </div>
      </div>
    </>
  );
}
