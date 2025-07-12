import z from "zod";

export const changeUserInfo = z.object({
  username: z.string().min(2, "Минимум 2 символа"),
  email: z.email("Некорректный Email")
});

export type TChangeUserInfo = z.infer<typeof changeUserInfo>;
