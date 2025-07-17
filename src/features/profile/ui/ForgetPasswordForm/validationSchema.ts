import z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email("Некорректный Email"),
});

export type TForgetPasswordShema = z.infer<typeof forgetPasswordSchema>;
