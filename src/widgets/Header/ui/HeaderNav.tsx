"use client";

import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";
import ClientOnly from "@/shared/components/ClientOnly";
import { useTheme } from "next-themes";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import ButtonLink from "@/shared/components/ButtonLink";

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
                    <ButtonLink variant="filled" href="/sign-up">
                      Регистрация
                    </ButtonLink>
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
