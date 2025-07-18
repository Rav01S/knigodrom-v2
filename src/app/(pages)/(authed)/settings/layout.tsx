// components/Layout.tsx (или где он у вас находится)
"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md"; // Добавим иконку для примера
import { RiNotification3Line } from "react-icons/ri"; // Еще одна иконка

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();

  // Проверяем, находится ли пользователь на корневой странице настроек
  const isSettingsRoot = pathname === "/settings";
  // Проверяем, находится ли пользователь на странице аккаунта (main)
  const isAccountPage = pathname === "/settings/main";

  return (
    <div className="settings-page-container flex-1 flex flex-col sm:flex-row min-h-[calc(100vh-64px)]"> {/* min-h для заполнения всей высоты */}
      {/* Левая панель навигации */}
      <div className={clsx(
        "settings-nav-left w-full sm:w-1/4 lg:w-1/5 p-4 sm:p-6", // Более адаптивная ширина
        "border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700", // Красивые разделители
        "flex flex-col gap-6", // Отступы для содержимого
        {
          "hidden sm:flex": !isSettingsRoot && isAccountPage, // Скрываем, если не на корневой и не на аккаунте (мобильное поведение)
          "flex": isSettingsRoot || isAccountPage, // Показываем, если на корневой или аккаунте
        }
      )}>
        <div className="sticky top-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center sm:text-left">Настройки</h2>
          <ul className="settings-nav-list flex flex-col gap-3">
            <li>
              <Link
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg",
                  "text-lg font-medium", // Увеличим размер шрифта
                  "transition-colors duration-200 ease-in-out",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  {
                    "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200": isAccountPage, // Активное состояние
                    "text-gray-700 dark:text-gray-300": !isAccountPage, // Неактивное состояние
                  }
                )}
                href="/settings/main"
              >
                <MdOutlineManageAccounts fontSize="26px" /> {/* Чуть больше иконка */}
                Аккаунт
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Правая панель с содержимым */}
      <div className={clsx(
        "settings-content-right flex-grow p-4 sm:p-6", // Занимает остальное пространство
        {
          "hidden sm:block": isSettingsRoot, // Скрываем контент, если на корневой (мобильное поведение)
          "block": !isSettingsRoot, // Показываем контент, если не на корневой
        }
      )}>
        {props.children}
      </div>
    </div>
  );
}