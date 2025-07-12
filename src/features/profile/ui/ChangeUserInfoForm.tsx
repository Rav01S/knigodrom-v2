"use client";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useForm } from "react-hook-form";
import { changeUserInfo, TChangeUserInfo } from "./ChangeUserInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { User } from "better-auth";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { toast } from "react-toastify";
import FieldErrorText from "@/shared/components/FieldErrorText";

export default function ChangeUserInfoForm({ user }: { user: User }) {
  const {
    formState: { errors, isDirty, isSubmitting },
    setValue,
    register,
    handleSubmit,
  } = useForm<TChangeUserInfo>({
    resolver: zodResolver(changeUserInfo),
    defaultValues: {
      email: user.email,
      username: user.name,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.name);
      setValue("email", user.email);
    }
  }, [setValue, user]);

  const onSubmit = async (data: TChangeUserInfo) => {
    try {
      if (data.username !== user.name) {
        await authClient.updateUser({
          name: data.username,
        });
        toast.success("Изменения сохранены");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (e) {
      toast.error("Не удалось сохранить изменения, попробуйте позже");
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="personal-info__text flex flex-col gap-4"
    >
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="fullname">ФИО</label>
        <Input
          placeholder="Иванов Иван Иванович"
          id="fullname"
          {...register("username")}
        />
        <FieldErrorText>{errors.username?.message}</FieldErrorText>
      </div>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input
          disabled
          placeholder="email@mail.ru"
          id="email"
          {...register("email")}
        />
        <FieldErrorText>{errors.email?.message}</FieldErrorText>
      </div>
      <Button disabled={!isDirty || isSubmitting} variant="filled">
        Сохранить изменения
      </Button>
    </form>
  );
}
