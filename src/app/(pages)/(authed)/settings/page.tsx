"use client";

import useIsMobileScreen from "@/shared/hooks/useIsMobileScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { isMobileScreen } = useIsMobileScreen();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isMobileScreen && isMounted) {
      router.replace("/settings/main");
    }
  }, [isMobileScreen, isMounted, router]);

  return null;
}
