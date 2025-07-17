import z from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Некорректный email"),
    password: z
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
    username: z
      .string()
      .min(2, { message: "ФИО должно содержать хотя бы 2 символа" })
      .max(100, { message: "ФИО не должно превышать 100 символов" }),
  })
  .refine((data) => data.password === data.password_repeat, {
    error: "Пароли должны совпадать",
    path: ["password_repeat"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
