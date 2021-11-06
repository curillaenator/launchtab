import { useState } from "react";
import type { PopupPosition } from "reactjs-popup/dist/types";

export const usePopupPosition = (
  initialPos: PopupPosition
): [PopupPosition, number, (e: MouseEvent) => void] => {
  const [offsetY, setOffsetY] = useState(0);
  const [pos, setPos] = useState<PopupPosition>(initialPos);

  const onTriggerClick = (e: MouseEvent) => {
    if (window.innerWidth <= 1024) return setPos("bottom center");

    if (e.clientY < window.innerHeight / 2) {
      setOffsetY(0);
    } else {
      setOffsetY(-128);
    }

    if (e.clientX < window.innerWidth / 2) return setPos("right center");

    return setPos("left center");
  };

  return [pos, offsetY, onTriggerClick];
};
