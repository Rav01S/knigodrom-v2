"use client";

import ClientOnly from "@/shared/components/ClientOnly";
import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  const { resolvedTheme } = useTheme();
  const { isMobileScreen } = useIsMobileScreen();

  const session = authClient.useSession();

  const isAuthed = !!session.data;

  if (!session || session.isPending) return null;

  return (
    <ClientOnly>
      <Link
        href={isAuthed ? "/dashboard" : "/"}
        className="header__logo flex items-center gap-4 max-h-11"
      >
        <div
          className={clsx("header__logo-image px-1 py-2", {
            "bg-white rounded": resolvedTheme === "dark",
            "w-32": !isMobileScreen,
            "w-24": isMobileScreen,
          })}
        >
          <Image width={128} height={40} alt="Logo" src="/next.svg" />
        </div>
        <h4 className="hidden sm:block">Knigodrom-v2</h4>
      </Link>
    </ClientOnly>
  );
}
