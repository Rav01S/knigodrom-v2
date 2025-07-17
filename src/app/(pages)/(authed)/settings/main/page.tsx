"use client";

import ChangeUserAvatar from "@/features/profile/ui/ChangeUserAvatarForm";
import ChangeUserEmailForm from "@/features/profile/ui/ChangeUserEmailForm";
import ChangeUserInfoForm from "@/features/profile/ui/ChangeUserInfoForm";
import ChangeUserPasswordForm from "@/features/profile/ui/ChangeUserPasswordForm";
import DeleteAccount from "@/features/profile/ui/DeleteAccount";
import { authClient } from "@/shared/lib/better-auth/clientAuth";

export default function Page() {
  const session = authClient.useSession();

  if (!session.data?.user) return null;

  return (
    <div className="settings-right flex-4">
      <div className="settings-container flex flex-col gap-6 container max-w-xl mx-auto">
        <h1 className="text-center !mb-0">Аккаунт</h1>
        <section className="flex flex-col gap-4" id="personal-info">
          <h3>Персональная информация</h3>
          <ChangeUserAvatar image={session.data.user.image} />
          <ChangeUserInfoForm user={session.data.user} />
        </section>
        <section className="flex flex-col gap-2" id="change-email">
          <h3>Email</h3>
          <ChangeUserEmailForm user={session.data.user} />
        </section>
        <section className="flex flex-col gap-2" id="change-password">
          <h3 className="!mb-0">Пароль</h3>
          <p className="text-gray-400">
            Изменив пароль, вы сбросите все сессии на других устройствах, кроме
            данной сессии
          </p>
          <ChangeUserPasswordForm userEmail={session.data.user.email} />
        </section>
        <section className="flex flex-col gap-2" id="delete-account">
          <h3 className="!mb-0">Удаление аккаунта</h3>
          <p className="text-gray-400">
            Удаление аккаунта приведет к удалению всех данных о вас на данном
            сайте
          </p>
          <DeleteAccount />
        </section>
      </div>
    </div>
  );
}
