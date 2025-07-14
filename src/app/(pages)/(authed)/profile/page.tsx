"use server";

import { auth } from "@/shared/lib/better-auth/auth";
import { DEFAULT_AVATAR_IMAGE } from "@/shared/lib/clientConstants";
import { headers } from "next/headers";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <>
      <section
        id="user-information"
        className="flex flex-col gap-4 justify-center items-center"
      >
        <div className="user-image">
          <Image
            src={session.user.image || DEFAULT_AVATAR_IMAGE}
            alt="User Avatar"
            width={500}
            height={500}
            className="object-cover rounded-xl aspect-square ring-2 ring-gray-500"
          />
        </div>
        <div className="user-info">
          <h2 className="!mb-0 text-center">{session.user.name}</h2>
          <p className="text-gray-400 text-sm text-center">{session.user.email}</p>
        </div>
      </section>
    </>
  );
}
