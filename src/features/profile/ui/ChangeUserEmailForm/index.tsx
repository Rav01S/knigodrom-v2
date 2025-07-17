"use client";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useForm } from "react-hook-form";
import { changeUserEmail, TChangeUserEmail } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { User } from "better-auth";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { toast } from "react-toastify";
import FieldErrorText from "@/shared/components/FieldErrorText";

export default function ChangeUserEmailForm({ user }: { user: User }) {
  const {
    formState: { errors, isDirty, isSubmitting },
    setValue,
    register,
    handleSubmit,
  } = useForm<TChangeUserEmail>({
    resolver: zodResolver(changeUserEmail),
    defaultValues: {
      email: user.email,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
    }
  }, [setValue, user]);

  const onSubmit = async (data: TChangeUserEmail) => {
    if (user.email === data.email) return;
    try {
      if (!user.emailVerified) {
        toast.error("Email не подтвержден");
        return;
      }
      const res = await authClient.changeEmail({
        newEmail: data.email,
      });
      if (res.error) {
        if (res.error.code === "COULDNT_UPDATE_YOUR_EMAIL") {
          toast.error(`Невозможно поменять email на ${data.email}`);
        } else {
          toast.error(res.error.message);
        }
        return;
      } else {
        toast.success("Вам отправлена ссылка на изменение Email");
      }
    } catch (e) {
      toast.error("Не удалось сохранить изменения, попробуйте позже");
      console.log(e);
    }
  };

  const sendVerificationEmail = async () => {
    const res = await authClient.sendVerificationEmail({
      email: user.email,
    });
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("На ваш Email отправлено подтверждение");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="change-email-form flex flex-col gap-4"
    >
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input
          disabled={!user.emailVerified}
          placeholder="email@mail.ru"
          id="email"
          {...register("email")}
        />
        <FieldErrorText>
          {errors.email?.message ||
            (!user.emailVerified && "Вы неподтвердили ваш email")}
        </FieldErrorText>
      </div>
      {user.emailVerified ? (
        <Button disabled={!isDirty || isSubmitting} variant="filled">
          Сохранить изменения
        </Button>
      ) : (
        <Button type="button" onClick={sendVerificationEmail} variant="filled">
          Отправить подтверждение
        </Button>
      )}
    </form>
  );
}
