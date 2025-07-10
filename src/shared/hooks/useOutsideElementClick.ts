// useOutsideElementClick.ts
import { useEffect, RefObject } from "react";

function useOutsideElementClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Если элемент не существует или клик произошел внутри элемента, ничего не делаем.
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Вызываем обработчик, если клик произошел снаружи.
      handler(event);
    };

    // Добавляем слушатель события mousedown на весь документ.
    // Используем mousedown вместо click, чтобы избежать проблем с событиями focus/blur.
    document.addEventListener("mousedown", listener);

    return () => {
      // Удаляем слушатель события при размонтировании компонента.
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]); // Зависимости: ref и handler.
}

export default useOutsideElementClick;
