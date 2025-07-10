"use client";

import clsx from "clsx";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        className={clsx("border-2 px-4 py-2 outline-none rounded", className)}
        {...props}
      />
    </>
  );
}
