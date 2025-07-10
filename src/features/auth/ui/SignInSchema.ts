import z from "zod";

export const signInSchema = z.object({
  email: z.email("Некорректный email"),
  password: z
    .string()
    .refine((val) => /[a-z]/.test(val), {
      message: "Пароль должен содержать только латинские буквы",
    })
    .min(8, { message: "Пароль должен содержать хотя бы 8 символов" })
    .max(100, { message: "Пароль не должен превышать 100 символов" })
    /* .refine((val) => /[A-Z]/.test(val), {
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
    }), */
});

export type TSignInSchema = z.infer<typeof signInSchema>;
