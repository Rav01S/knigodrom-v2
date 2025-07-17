"use server";

import ResetPasswordForm from "@/features/auth/ui/reset-password-form";
import { Suspense } from "react";

export default async function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
