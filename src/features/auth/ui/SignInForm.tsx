"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInSchema } from "./SignInSchema";
import Input from "@/shared/components/Input";
import Link from "next/link";
import Button from "@/shared/components/Button";
import ButtonLink from "@/shared/components/ButtonLink";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "@/shared/components/PasswordInput";
import FieldErrorText from "@/shared/components/FieldErrorText";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/shared/components/Spinner";

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    const res = await authClient.signIn.email(data);

    if (res.error) {
      if (res.error?.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("email", { message: "Неверный email или пароль" });
      }

      setValue("password", "");
      return;
    }

    if (res.data.user) {
      toast.success("Добро пожаловать, " + res.data.user.name);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
  };

  return (
    <form
      className="max-w-lg w-full mx-auto flex flex-col gap-4 shadow border-2 p-4 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center">Вход</h1>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input
          placeholder="email@mail.ru"
          type="email"
          id="email"
          {...register("email")}
        />
        <FieldErrorText>{errors.email?.message}</FieldErrorText>
      </div>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="password">Пароль</label>
        <PasswordInput {...register("password")} />
        <FieldErrorText>{errors.password?.message}</FieldErrorText>
      </div>
      <Button
        className="flex items-center gap-4 justify-center"
        variant="filled"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner primaryColor="#000" /> Входим...
          </>
        ) : (
          "Войти"
        )}
      </Button>
      <p className="text-center">
        Нет аккаунта?{" "}
        <Link className="underline" href="/sign-up">
          Зарегистрироваться
        </Link>
      </p>
      <hr className="border" />
      <div className="another-sign-in">
        <h3 className="text-center">Или</h3>
        <ButtonLink
          className="w-full !flex items-center justify-center gap-4"
          variant="outline"
          href="/sign-in"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: window.location.origin + "/profile",
            })
          }
        >
          Войти с Google <FcGoogle fontSize="24px" />
        </ButtonLink>
      </div>
    </form>
  );
}
