"use client";

import Spinner from "@/shared/components/Spinner";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
        onError: () => {
          window.location.reload();
        },
      },
    });
  }, []);

  return (
    <>
      <h1 className="flex items-center justify-center gap-4">
        <Spinner />
        Выходим из аккаунта...
      </h1>
    </>
  );
}
