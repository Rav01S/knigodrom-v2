"use server";

import { auth } from "@/shared/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return <>{children}</>;
}
