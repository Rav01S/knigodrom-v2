"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

interface IClientOnlyProps extends PropsWithChildren {
  skeleton?: ReactNode;
}

export default function ClientOnly(props: IClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return props.skeleton || <></>;
  }

  return <>{props.children}</>;
}
