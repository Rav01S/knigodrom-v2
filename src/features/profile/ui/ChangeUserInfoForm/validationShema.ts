import z from "zod";

export const changeUserInfo = z.object({
  username: z.string().min(2, "Минимум 2 символа"),
});

export type TChangeUserInfo = z.infer<typeof changeUserInfo>;
