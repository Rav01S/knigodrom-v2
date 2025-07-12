"use client";

import ButtonLink from "@/shared/components/ButtonLink";

export default function Page() {
  return (
    <div className="settings-right flex-4">
      <h1>Аккаунт</h1>
      <h2>Пароль</h2>
      <ButtonLink href="/change-password">Сброс пароля</ButtonLink>
      <h2>Удаление аккаунта</h2>
      <ButtonLink className="!text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white" href="/delete-my-account">Удалить аккаунт</ButtonLink>
    </div>
  );
}
