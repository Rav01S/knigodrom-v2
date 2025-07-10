"use server";

import { auth } from "@/shared/lib/better-auth/auth";
import { headers } from "next/headers";
import HeaderContainer from "./ui/HeaderContainer";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthed = !!session;

  return <HeaderContainer isAuthed={isAuthed} />;
}
