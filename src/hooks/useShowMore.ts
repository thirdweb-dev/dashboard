import { useCallback, useState } from "react";

export function useShowMore<T extends HTMLElement>(
  initialItemsToShow: number,
  itemsToAdd: number,
) {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const lastItemRef = useCallback(
    (node: T) => {
      if (!node) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setItemsToShow((prev) => prev + itemsToAdd);
          }
        },
        { threshold: 1 },
      );

      observer.observe(node);
    },
    [itemsToAdd],
  );

  return { itemsToShow, lastItemRef };
}
