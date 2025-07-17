"use client";
import Button from "@/shared/components/Button";
import FieldErrorText from "@/shared/components/FieldErrorText";
import Input from "@/shared/components/Input";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema, TForgetPasswordShema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TForgetPasswordShema>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: TForgetPasswordShema) => {
    const res = await authClient.forgetPassword({
      email: data.email,
      redirectTo: "/auth/reset-password",
    });
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Ссылка на смену пароля отправлена вам на почту");
    }
  };

  return (
    <form className="max-w-xl mx-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="!mb-0">Восстановление пароля</h1>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input {...register("email")} placeholder="email@mail.ru" />
        <FieldErrorText>{errors.email?.message}</FieldErrorText>
      </div>
      <Button variant="filled">Отправить ссылку</Button>
    </form>
  );
}
