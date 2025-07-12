"use client";

import ChangeUserAvatar from "@/features/profile/ui/ChangeUserAvatar";
import ChangeUserInfoForm from "@/features/profile/ui/ChangeUserInfoForm";
import ButtonLink from "@/shared/components/ButtonLink";
import { authClient } from "@/shared/lib/better-auth/clientAuth";

export default function Page() {
  const session = authClient.useSession();

  if (!session.data?.user) return null;

  return (
    <div className="settings-right flex-4">
      <div className="settings-container flex flex-col gap-4 max-w-md md:max-w-xl mx-auto">
        <h1 className="text-center !mb-0">Аккаунт</h1>
        <section className="flex flex-col gap-4" id="personal-info">
          <h3>Персональная информация</h3>
          <ChangeUserAvatar image={session.data.user.image} />
          <ChangeUserInfoForm user={session.data.user} />
        </section>
        <section className="flex flex-col gap-2" id="change-password">
          <h3>Пароль</h3>
          <p className="text-gray-400">
            Сбросив пароль, вы сбросите все сессии на других устройствах, кроме
            данной сессии
          </p>
          <ButtonLink className="w-full md:max-w-fit" href="/change-password">
            Сбросить пароль
          </ButtonLink>
        </section>
        <section className="flex flex-col gap-2" id="delete-account">
          <h3>Удаление аккаунта</h3>
          <p className="text-gray-400">
            Удаление аккаунта приведет к удалению всех данных о вас на данном
            сайте
          </p>
          <ButtonLink
            className="w-full md:max-w-fit !text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white"
            href="/delete-my-account"
          >
            Удалить аккаунт
          </ButtonLink>
        </section>
      </div>
    </div>
  );
}
