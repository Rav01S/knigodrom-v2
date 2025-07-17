"use client";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/shared/lib/better-auth/clientAuth";

export default function DeleteAccount() {
  const [isHidden, setIsHidden] = useState(true);

  const onSubmit = async () => {
    const toastId = toast.loading("Отправляем запрос на удаление аккаунта...");
    const res = await authClient.deleteUser();
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.update(toastId, {
        render: "На вашу почту была отправлена ссылка для удаления аккаунта",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsHidden(false)}
        className="w-full md:max-w-fit !text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white"
      >
        Удалить аккаунт
      </Button>
      <Modal
        invertColors
        setIsHidden={setIsHidden}
        onSubmit={onSubmit}
        isHidden={isHidden}
      >
        <h3>Вы точно хотите удалить аккаунт?</h3>
      </Modal>
    </>
  );
}
