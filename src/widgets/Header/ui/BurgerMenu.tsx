"use client";
import clsx from "clsx";
import { useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";
import useOutsideElementClick from "@/shared/hooks/useOutsideElementClick";
import ButtonLink from "@/shared/components/ButtonLink";

type TBurgerMenu = {
  isAuthed: boolean;
};

export default function BurgerMenu({ isAuthed }: TBurgerMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideElementClick(ref, () => setIsOpen(false));

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Overlay для затемнения фона */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={closeMenu}
        />
      )}

      <button
        className="block sm:hidden p-4 cursor-pointer"
        aria-label="Open menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RxHamburgerMenu fontSize="24px" />
      </button>

      <div
        ref={ref}
        className={clsx(
          "fixed sm:hidden top-0 h-screen w-64 transition-transform duration-300 shadow-lg z-50",
          "bg-white dark:bg-black", // Используем dark: вместо условной логики
          {
            "translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
        style={{ right: 0 }} // Фиксированная позиция справа
      >
        <div className="burger__container flex h-full relative flex-col gap-4 py-2 px-4">
          <button
            aria-label="Close menu"
            className="ms-auto p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={closeMenu}
          >
            <MdClose fontSize="24px" />
          </button>

          <ul className="burger__nav-list flex flex-col gap-4">
            {isAuthed ? (
              <>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="inline-block w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    href="/profile"
                  >
                    Профиль
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="inline-block w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    href="/settings"
                  >
                    Настройки
                  </Link>
                </li>
                <li>
                  <a
                    onClick={closeMenu}
                    className="inline-block w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    href="/auth/sign-out"
                  >
                    Выход
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="inline-block w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    href="/auth/sign-in"
                  >
                    Вход
                  </Link>
                </li>
                <li>
                  <ButtonLink
                    onClick={closeMenu}
                    className="w-full"
                    variant="filled"
                    href="/auth/sign-up"
                  >
                    Регистрация
                  </ButtonLink>
                </li>
              </>
            )}
          </ul>

          <ThemeSwitcher
            onClick={closeMenu}
            className="absolute left-4 bottom-4"
          />
        </div>
      </div>
    </>
  );
}