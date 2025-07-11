"use client";

import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout(props: PropsWithChildren) {
  const { isMobileScreen } = useIsMobileScreen();
  const pathname = usePathname();

  return (
    <>
      <div
        className={clsx("settings-page-container flex gap-4", {
          "flex-col": isMobileScreen,
        })}
      >
        {((isMobileScreen && pathname === "/settings") || (!isMobileScreen)) && (
          <div
            className={clsx("settings-page-left p-2 flex-1", {
              "border-r-2 border-r-gray-400": !isMobileScreen,
            })}
          >
            <h2 className="text-center">Настройки</h2>
            <ul className="settings-page-list flex flex-col">
              <li>
                <Link className="inline-block px-4 py-2" href="/settings/main">
                  Основная информация
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block px-4 py-2"
                  href="/settings/security"
                >
                  Безопасность
                </Link>
              </li>
            </ul>
          </div>
        )}
        {props.children}
      </div>
    </>
  );
}
