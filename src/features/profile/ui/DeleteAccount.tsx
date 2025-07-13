"use client";

import Button from "@/shared/components/Button";
import FieldErrorText from "@/shared/components/FieldErrorText";
import Modal from "@/shared/components/Modal";
import PasswordInput from "@/shared/components/PasswordInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import Link from "next/link";
import Input from "@/shared/components/Input";
import {
  deleteUserAccountSchema,
  TDeleteUserAccountSchema,
} from "./DeleteAccountSchema";

export default function DeleteAccount() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TDeleteUserAccountSchema>({
    resolver: zodResolver(deleteUserAccountSchema),
  });
  const [isHidden, setIsHidden] = useState(true);

  const onSubmit = async (data: TDeleteUserAccountSchema) => {
    try {
      const res = await authClient.deleteUser({
        password: data.old_password,
      });
      if (res.error) {
        if (res.error.code === "INVALID_PASSWORD") {
          toast.error("Неверный текущий пароль");
        } else {
          toast.error(res.error.message);
        }
        return;
      }
      toast.success("Пароль успешно изменен");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
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
      <Modal variant="input" setIsHidden={setIsHidden} isHidden={isHidden}>
        <form
          className="flex flex-col justify-between pt-10 gap-4 w-full h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form__content flex flex-col gap-4">
            <h3>Удаление аккаунта</h3>
            <div className="form__field">
              <label htmlFor="old_password">Текущий пароль</label>
              <PasswordInput {...register("old_password")} />
              <FieldErrorText>{errors.old_password?.message}</FieldErrorText>
            </div>
            <p>
              Забыли пароль?{" "}
              <Link href="/forgot-password" className="text-center underline">
                Сбросить
              </Link>
            </p>
            <div className="form__field">
              <label htmlFor="new_password">Код</label>
              <div className="container flex items-center justify-between gap-4">
                <Input className="flex-1" {...register("code")} />
                <Button type="button">Отправить код</Button>
              </div>
              <FieldErrorText>{errors.code?.message}</FieldErrorText>
            </div>
          </div>
          <Button disabled={isSubmitting} variant="filled">
            Удалить аккаунт
          </Button>
        </form>
      </Modal>
    </>
  );
}
