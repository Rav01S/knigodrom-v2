// app/settings/main/page.tsx (или где ваш Main Settings Page)
"use client";

import ChangeUserAvatar from "@/features/profile/ui/ChangeUserAvatarForm";
import ChangeUserEmailForm from "@/features/profile/ui/ChangeUserEmailForm";
import ChangeUserInfoForm from "@/features/profile/ui/ChangeUserInfoForm";
import ChangeUserPasswordForm from "@/features/profile/ui/ChangeUserPasswordForm";
import DeleteAccount from "@/features/profile/ui/DeleteAccount";
import { authClient } from "@/shared/lib/better-auth/clientAuth";

export default function Page() {
  const session = authClient.useSession();

  // Отображаем загрузку, если сессия не готова
  if (session.isPending) {
    return (
      <div className="flex justify-center items-center h-full text-lg text-gray-500 dark:text-gray-400">
        Загрузка настроек...
      </div>
    );
  }

  // Если пользователь не авторизован, можно перенаправить или показать сообщение
  if (!session.data?.user) {
    return (
      <div className="flex justify-center items-center h-full text-lg text-red-500">
        Ошибка: Пользователь не авторизован.
      </div>
    );
  }

  return (
    <div className="settings-main-content">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center sm:text-left">Аккаунт</h1>

      <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Персональная информация</h2>
        <div className="flex flex-col gap-5">
          <ChangeUserAvatar image={session.data.user.image} />
          <ChangeUserInfoForm user={session.data.user} />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Email</h2>
        <ChangeUserEmailForm user={session.data.user} />
      </section>

      <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Пароль</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Изменив пароль, вы сбросите все сессии на других устройствах, кроме
          данной.
        </p>
        <ChangeUserPasswordForm userEmail={session.data.user.email} />
      </section>

      <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Удаление аккаунта</h2>
        <p className="text-red-600 dark:text-red-400 text-sm mb-4">
          Удаление аккаунта приведет к безвозвратному удалению всех данных о вас на данном
          сайте.
        </p>
        <DeleteAccount />
      </section>
    </div>
  );
}