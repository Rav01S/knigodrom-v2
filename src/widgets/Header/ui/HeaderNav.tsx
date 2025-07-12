"use client";

import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";
import ClientOnly from "@/shared/components/ClientOnly";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import ButtonLink from "@/shared/components/ButtonLink";
import Image from "next/image";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import Dropdown from "@/shared/components/Dropdown";
import { DEFAULT_AVATAR_IMAGE } from "@/shared/lib/helpers";

export default function HeaderNav() {
  const { isMobileScreen } = useIsMobileScreen();
  const session = authClient.useSession();

  const isAuthed = !!session.data;

  if (!session || session.isPending) return null;

  return (
    <ClientOnly>
      <nav className="header__nav flex items-center gap-4">
        {!isMobileScreen && (
          <>
            <ul className="header__nav-list flex items-center gap-4">
              {isAuthed && (
                <>
                  <li>
                    <Dropdown>
                      <Dropdown.Title className="flex gap-4 items-center">
                        <Image
                          src={
                            session.data?.user.image ||
                            DEFAULT_AVATAR_IMAGE
                          }
                          alt="User Avatar"
                          width={100}
                          height={100}
                          className="rounded-full w-12 h-12 ring-2 ring-gray-500"
                        />
                        {session.data?.user.name || ""}
                      </Dropdown.Title>
                      <Dropdown.Content>
                        <Link
                          className="inline-block p-2 w-full text-center"
                          href="/profile"
                        >
                          Профиль
                        </Link>
                        <Link
                          className="inline-block p-2 w-full text-center"
                          href="/settings"
                        >
                          Настройки
                        </Link>
                        <Link
                          className="inline-block p-2 w-full text-center"
                          href="/sign-out"
                        >
                          Выйти
                        </Link>
                      </Dropdown.Content>
                    </Dropdown>
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
