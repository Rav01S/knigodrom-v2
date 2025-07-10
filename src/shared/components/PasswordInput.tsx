"use client";

import clsx from "clsx";
import Input from "./Input";
import { useState } from "react";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";

type TPasswordInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({
  className,
  ...props
}: TPasswordInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="password-input w-full relative">
      <Input
        className={clsx("w-full", className)}
        placeholder="ASj21jK@!"
        type={isOpen ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {isOpen ? (
          <PiEyeClosedLight fontSize="24px" />
        ) : (
          <PiEyeLight fontSize="24px" />
        )}
      </button>
    </div>
  );
}
