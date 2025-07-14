"use client";

import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import Button from "./Button";
import useOutsideElementClick from "../hooks/useOutsideElementClick";
import { useTheme } from "next-themes";
import { FaWindowClose } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import useIsMobileScreen from "../hooks/useIsMobileScreen";

type TModalProps = {
  variant?: "confirm" | "input";
  invertColors?: boolean;
  onSubmit?: () => void | Promise<void>;
  isHidden: boolean;
  setIsHidden: (val: boolean) => void;
  children: ReactNode;
  className?: string;
};

export default function Modal({
  isHidden,
  onSubmit,
  invertColors,
  setIsHidden,
  variant = "confirm",
  children,
  className,
  ...props
}: TModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useOutsideElementClick(ref, () => setIsHidden(true));
  const { isMobileScreen } = useIsMobileScreen();

  const showModal = useCallback(() => {
    document.documentElement.classList.add("overflow-hidden");
    setIsHidden(false);
  }, [setIsHidden]);

  const closeModal = useCallback(() => {
    document.documentElement.classList.remove("overflow-hidden");
    setIsHidden(true);
  }, [setIsHidden]);

  useEffect(() => {
    if (!isHidden) {
      showModal();
    }
    return closeModal;
  }, [closeModal, isHidden, showModal]);

  const _onSubmit = async () => {
    if (onSubmit) await onSubmit();
    closeModal();
  };

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ display: "none", opacity: 0, y: 10 }}
          animate={{
            display: "flex",
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          {...props}
          className={clsx(
            "fixed flex-col gap-4 w-full",
            {
              "bg-black": resolvedTheme === "dark",
              "bg-white": resolvedTheme === "light",
              "top-0 left-0 h-screen z-50": isMobileScreen,
              "max-w-[_min(100vw,500px)] left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 border-2 border-gray-400 rounded-xl":
                !isMobileScreen,
            },
            className
          )}
          ref={ref}
        >
          <div className="modal__container relative p-4 flex-1">
            <button
              aria-label="close modal"
              className="modal__close-button cursor-pointer absolute right-4 top-4"
              onClick={closeModal}
            >
              <FaWindowClose fontSize="24px" color="red" />
            </button>
            {variant === "confirm" && (
              <div className="modal__container pt-10 h-full flex flex-col items-center justify-center sm:items-start sm:justify-start gap-4 text-center">
                <div className="modal__content">{children}</div>
                <div className="modal__buttons flex items-center justify-end gap-2">
                  <Button
                    className={clsx({
                      "!text-green-500 !border-green-500 hover:!bg-green-500 hover:!text-white w-20":
                        !invertColors,
                      "!text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white w-20":
                        invertColors,
                    })}
                    onClick={_onSubmit}
                  >
                    Да
                  </Button>
                  <Button
                    onClick={closeModal}
                    className={clsx({
                      "!text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white w-20":
                        !invertColors,
                      "!text-green-500 !border-green-500 hover:!bg-green-500 hover:!text-white w-20":
                        invertColors,
                    })}
                  >
                    Нет
                  </Button>
                </div>
              </div>
            )}
            {variant === "input" && <>{children}</>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
