"use client";

import Button from "@/shared/components/Button";
import FieldErrorText from "@/shared/components/FieldErrorText";
import Modal from "@/shared/components/Modal";
import PasswordInput from "@/shared/components/PasswordInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  changeUserPasswordSchema,
  TChangeUserPasswordSchema,
} from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import Link from "next/link";

export default function ChangeUserPasswordForm({
  userEmail,
}: {
  userEmail: string;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TChangeUserPasswordSchema>({
    resolver: zodResolver(changeUserPasswordSchema),
  });
  const [isHidden, setIsHidden] = useState(true);

  const onSubmit = async (data: TChangeUserPasswordSchema) => {
    const res = await authClient.changePassword({
      currentPassword: data.old_password,
      newPassword: data.new_password,
      revokeOtherSessions: true,
    });
    if (res.error) {
      if (res.error.code === "INVALID_PASSWORD") {
        toast.error("Неверный текущий пароль");
      } else {
        toast.error(res.error.message);
      }
    } else {
      toast.success("Пароль успешно изменен");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const sendResetPasswordLink = async () => {
    const toastId = toast.loading("Отправляем ссылку на изменение пароля");
    const res = await authClient.forgetPassword({
      email: userEmail,
      redirectTo: "/auth/reset-password"
    });
    if (res.error) {
      toast.update(toastId, {
        type: "error",
        render: "Ошибка: " + res.error.message,
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastId, {
        type: "success",
        render: "Ссылка на изменение пароля отправлена вам на почту",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsHidden(false)}
        className="w-full md:max-w-fit"
      >
        Изменить пароль
      </Button>
      <Modal variant="input" setIsHidden={setIsHidden} isHidden={isHidden}>
        <form
          className="flex flex-col justify-between pt-10 gap-4 w-full h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form__content flex flex-col gap-4">
            <h3 className="text-center">Изменить пароль</h3>
            <div className="form__field">
              <label htmlFor="old_password">Текущий пароль</label>
              <PasswordInput {...register("old_password")} />
              <FieldErrorText>{errors.old_password?.message}</FieldErrorText>
            </div>
            <div className="form__field">
              <label htmlFor="new_password">Новый пароль</label>
              <PasswordInput {...register("new_password")} />
              <FieldErrorText>{errors.new_password?.message}</FieldErrorText>
            </div>
            <div className="form__field">
              <label htmlFor="new_password_repeat">
                Повторите новый пароль
              </label>
              <PasswordInput {...register("new_password_repeat")} />
              <FieldErrorText>
                {errors.new_password_repeat?.message}
              </FieldErrorText>
            </div>
            <p>
              Забыли пароль?{" "}
              <Link
                href="#"
                className="text-center underline"
                onClick={sendResetPasswordLink}
              >
                Сбросить
              </Link>
            </p>
          </div>
          <Button disabled={isSubmitting} variant="filled">
            Изменить пароль
          </Button>
        </form>
      </Modal>
    </>
  );
}
