"use server";

import { auth } from "@/shared/lib/better-auth/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  await auth.api.signOut({
    headers: await headers(),
  });

  revalidatePath("/", "layout");

  redirect("/auth/sign-in");
}
