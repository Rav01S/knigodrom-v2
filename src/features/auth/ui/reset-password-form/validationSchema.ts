import z from "zod";

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .refine((val) => /[a-z]/.test(val), {
        message: "Пароль должен содержать только латинские буквы",
      })
      .min(8, { message: "Пароль должен содержать хотя бы 8 символов" })
      .max(100, { message: "Пароль не должен превышать 100 символов" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Пароль должен содержать хотя бы одну строчную букву",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Пароль должен содержать хотя бы один специальный символ",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Пароль должен содержать хотя бы одну цифру",
      }),
    password_repeat: z.string(),
  })
  .refine((data) => data.new_password === data.password_repeat, {
    error: "Пароли должны совпадать",
    path: ["password_repeat"],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
