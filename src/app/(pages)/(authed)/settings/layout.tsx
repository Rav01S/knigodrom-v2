"use client";

import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";

export default function Layout(props: PropsWithChildren) {
  const { isMobileScreen } = useIsMobileScreen();
  const pathname = usePathname();

  return (
    <>
      <div
        className={clsx(
          "settings-page-container flex-1 items-stretch flex gap-4",
          {
            "flex-col": isMobileScreen,
          }
        )}
      >
        {((isMobileScreen && pathname === "/settings") || !isMobileScreen) && (
          <div
            className={clsx("settings-page-left p-2 flex-1", {
              "border-r-2 border-r-gray-400": !isMobileScreen,
            })}
          >
            <div className="settings-left-container container mx-auto sticky top-16">
              <h2 className="text-center md:text-start">Настройки</h2>
              <ul className="settings-page-list flex flex-col">
                <li>
                  <Link
                    className="w-full flex items-center gap-4 px-4 py-2 rounded border-2 border-gray-800"
                    href="/settings/main"
                  >
                    <MdOutlineManageAccounts fontSize={"24px"}/>
                    Аккаунт
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {props.children}
      </div>
    </>
  );
}
