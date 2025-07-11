"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "./SignUpSchema";
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

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const { email, password, username } = data;
    const res = await authClient.signUp.email({
      email,
      password,
      name: username,
    });

    if (res.error) {
      if (res.error?.code === "USER_ALREADY_EXISTS") {
        setError("email", { message: "Такой email уже зарегистрирован" });
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
      <h1 className="text-center">Регистрация</h1>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="username">ФИО</label>
        <Input
          placeholder="ФИО"
          type="text"
          id="username"
          {...register("username")}
        />
        <FieldErrorText>{errors.username?.message}</FieldErrorText>
      </div>
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
        <PasswordInput className="pe-8" {...register("password")} />
        <FieldErrorText>{errors.password?.message}</FieldErrorText>
      </div>
      <div className="form-field flex flex-col gap-2">
        <label htmlFor="password_repeat">Пароль</label>
        <PasswordInput className="pe-8" {...register("password_repeat")} />
        <FieldErrorText>{errors.password_repeat?.message}</FieldErrorText>
      </div>
      <Button
        className="flex items-center gap-4 justify-center"
        variant="filled"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner primaryColor="#000" /> Регистрация...
          </>
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
      <p className="text-center">
        Есть аккаунт?{" "}
        <Link className="underline" href="/sign-in">
          Войти
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
