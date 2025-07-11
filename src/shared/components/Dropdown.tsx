"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import useOutsideElementClick from "../hooks/useOutsideElementClick";
import { AnimatePresence, motion } from "motion/react";

const dropdownContext = createContext<{ isOpen: boolean; toggle: () => void }>({
  isOpen: false,
  toggle: () => {},
});

export default function Dropdown({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideElementClick(ref, () => setIsOpen(false));

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <dropdownContext.Provider value={{ isOpen, toggle }}>
      <div
        ref={ref}
        className="dropdown relative flex items-center justify-center"
      >
        {children}
      </div>
    </dropdownContext.Provider>
  );
}

type TDropdownTitleProps = React.HTMLProps<HTMLButtonElement>;

Dropdown.Title = function DropdownTitle({
  children,
  className,
}: TDropdownTitleProps) {
  const { toggle } = useContext(dropdownContext);
  return (
    <button
      className={clsx(
        "dropdown__title flex items-center justify-center cursor-pointer",
        className
      )}
      onClick={toggle}
    >
      {children}
    </button>
  );
};

type TDropdownContentProps = React.HTMLProps<HTMLDivElement>;

Dropdown.Content = function DropdownContent({
  children,
  className,
}: TDropdownContentProps) {
  const { isOpen, toggle } = useContext(dropdownContext);
  const { resolvedTheme } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, display: "none" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          display: isOpen ? "flex" : "none",
        }}
        transition={{ duration: 0.2 }}
        exit={{ display: "none" }}
        onHoverEnd={() => toggle()}
        className={clsx(
          "dropdown__content flex-col absolute rounded-sm p-2 mt-4 top-full left-1/2 -translate-x-1/2 w-48 shadow-2xl border-2 border-gray-400",
          {
            "bg-white": resolvedTheme === "light",
            "bg-black": resolvedTheme === "dark",
          },
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
