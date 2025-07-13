import z from "zod";

export const changeUserPasswordSchema = z
  .object({
    old_password: z.string().min(8, "Минимум 8 символов"),
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
    new_password_repeat: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_repeat, {
    error: "Пароли должны совпадать",
    path: ["new_password_repeat"],
  });

export type TChangeUserPasswordSchema = z.infer<
  typeof changeUserPasswordSchema
>;
