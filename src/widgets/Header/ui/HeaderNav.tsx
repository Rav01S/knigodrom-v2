"use client";

import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";
import ClientOnly from "@/shared/components/ClientOnly";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";

type THeaderNavProps = {
  isAuthed: boolean;
};

export default function HeaderNav({ isAuthed }: THeaderNavProps) {
  const { resolvedTheme } = useTheme();
  const { isMobileScreen } = useIsMobileScreen();

  return (
    <ClientOnly>
      <nav className="header__nav flex items-center gap-4">
        {!isMobileScreen && (
          <>
            <ul className="header__nav-list flex items-center gap-4">
              {isAuthed && (
                <>
                  <li>
                    <Link href="/profile">Профиль</Link>
                  </li>
                  <li>
                    <Link href="/settings">Настройки</Link>
                  </li>
                  <li>
                    <Link href="/sign-out">Выход</Link>
                  </li>
                </>
              )}
              {!isAuthed && (
                <>
                  <li>
                    <Link href="/sign-in">Вход</Link>
                  </li>
                  <li>
                    <Link
                      className={clsx(
                        "border-2 inline-block px-4 py-1.5 rounded transition-colors",
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
            <ThemeSwitcher />
          </>
        )}

        {isMobileScreen && <BurgerMenu isAuthed={isAuthed} />}
      </nav>
    </ClientOnly>
  );
}
