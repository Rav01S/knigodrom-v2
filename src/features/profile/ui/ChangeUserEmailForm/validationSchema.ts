import z from "zod";

export const changeUserEmail = z.object({
  email: z.email("Некорректный Email")
});

export type TChangeUserEmail = z.infer<typeof changeUserEmail>;
