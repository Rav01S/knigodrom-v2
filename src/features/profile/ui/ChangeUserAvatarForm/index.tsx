"use client";

import Button from "@/shared/components/Button";
import { authClient } from "@/shared/lib/better-auth/clientAuth";
import { DEFAULT_AVATAR_IMAGE } from "@/shared/lib/clientConstants";
import { toBase64 } from "@/shared/lib/helpers";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";

export default function ChangeUserAvatar({
  image,
}: {
  image: string | null | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const activateFileDialog = () => {
    inputRef.current?.click();
  };

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file || file === null) {
      return;
    }

    const acceptedMimes = ["jpg", "jpeg", "svg", "png"];

    const splittedFileName = file.name.split(".");

    if (
      !acceptedMimes.includes(splittedFileName[splittedFileName.length - 1])
    ) {
      toast.error("Изображение должно быть формата: jpg, jpeg, svg, png");
      return;
    }
    
    const res = await authClient.updateUser({
      image: (await toBase64(file)) as string | null,
    });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Изображение сохранено");
    }
  };

  return (
    <div className="personal-info__main flex flex-col md:flex-row gap-4 md:items-center md:justify-start">
      <div className="overflow-hidden border-2 border-gray-400 rounded-xl flex-1 avatar flex items-center justify-center">
        <Image
          className="object-cover w-full aspect-square md:w-full md:h-full"
          src={image || DEFAULT_AVATAR_IMAGE}
          alt="Avatar"
          width={200}
          height={200}
        />
      </div>
      <Button onClick={activateFileDialog} className="flex-1">
        Изменить аватар
      </Button>
      <input
        onChange={onInputChange}
        type="file"
        ref={inputRef}
        className="_input hidden"
      />
    </div>
  );
}
