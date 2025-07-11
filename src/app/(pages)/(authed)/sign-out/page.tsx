"use client";

import Spinner from "@/shared/components/Spinner";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const router = useRouter();
  useEffect(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: () => {
          router.push("/sign-in");
        },
      },
    });
  }, [router]);

  return (
    <>
      <h1 className="flex items-center justify-center gap-4">
        <Spinner />
        Выходим из аккаунта...
      </h1>
    </>
  );
}
