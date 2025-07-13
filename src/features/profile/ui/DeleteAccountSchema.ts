import z from "zod";

export const deleteUserAccountSchema = z.object({
  old_password: z.string().min(8, "Минимум 8 символов"),
  code: z.string().min(2, "Минимум 2 символа"),
});

export type TDeleteUserAccountSchema = z.infer<typeof deleteUserAccountSchema>;
