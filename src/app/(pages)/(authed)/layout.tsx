"use server";

import { serverIsAuthed } from "@/shared/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthedLayout(props: PropsWithChildren) {
  const isAuthed = await serverIsAuthed();

  if (!isAuthed) {
    redirect("/auth/sign-in");
    return;
  }

  return props.children;
}
