"use client";

import { useForm } from "react-hook-form";
import { resetPasswordSchema, TResetPasswordSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/shared/components/PasswordInput";
import FieldErrorText from "@/shared/components/FieldErrorText";
import Button from "@/shared/components/Button";
import { toast } from "react-toastify";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: TResetPasswordSchema) => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error(
        "Пожалуйста, вернитесь за начало сброса пароля и еще раз получите сообщение на почту"
      );
      return;
    }

    const toastId = toast.loading("Изменение пароля");

    const res = await authClient.resetPassword({
      newPassword: data.new_password,
      token: token,
    });

    if (res.error) {
      if (res.error.code === "INVALID_TOKEN") {
        toast.update(toastId, {
          render:
            "Неверный токен. Необходимо получить ссылку сброса пароля еще раз",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Ошибка: " + res.error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return;
    } else {
      toast.update(toastId, {
        render: "Пароль успешно изменен",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setTimeout(() => {
        router.replace("/auth/sign-in");
      }, 1000);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="!mb-0">Изменение пароля</h1>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="new_password">Новый пароль</label>
        <PasswordInput {...register("new_password")} id="new_password" />
        <FieldErrorText>{errors.new_password?.message}</FieldErrorText>
      </div>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="password_repeat">Повторите новый пароль</label>
        <PasswordInput {...register("password_repeat")} id="password_repeat" />
        <FieldErrorText>{errors.password_repeat?.message}</FieldErrorText>
      </div>
      <Button disabled={isSubmitting}>Изменить пароль</Button>
    </form>
  );
}
