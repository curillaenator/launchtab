import { useState, useCallback, MouseEvent, CSSProperties } from 'react';

export type Layers = 'cloud4' | 'cloud3' | 'cloud2' | 'cloud1' | 'back5' | 'back4' | 'back3' | 'back2' | 'back1' | 'bg';

export const LAYERS_RATES: Record<string, number> = {
  cloud1: 3,
  cloud2: 4.5,
  cloud3: 6,
  cloud4: 8,
};

export const INITIAL_POSITION = {
  cX: window.innerWidth / 2,
  cY: window.innerHeight / 2,
  posX: 0,
  posY: 0,
};

type UseCloudsPositionStyleType = (props?: { skipCalc?: boolean }) => {
  layerRotation: CSSProperties;
  positionStyles: Record<Layers, CSSProperties>;
  watchMouse: (e: MouseEvent) => void;
};

export const useCloudsPositionStyle: UseCloudsPositionStyleType = (props) => {
  const { skipCalc } = props || {};

  const [position, setPosition] = useState(INITIAL_POSITION);

  const watchMouse = useCallback(
    (e: MouseEvent) => {
      if (skipCalc || !e) return;

      setPosition({
        cX: window.innerWidth / 2,
        cY: window.innerHeight / 2,
        posX: e.pageX - window.innerWidth / 2,
        posY: e.pageY - window.innerHeight / 2,
      });
    },
    [skipCalc],
  );

  const { cX, cY, posX, posY } = position;

  const layerRotation: CSSProperties = {
    transform: `
    rotate3d(0, 1, 0, ${(posX / cX) * 12}deg) 
    rotate3d(-1, 0, 0, ${(posY / cY) * 12}deg)
    `,
  };

  const positionStyles = Object.fromEntries(
    Object.keys(LAYERS_RATES).map((layer) => {
      const q = LAYERS_RATES[layer];
      return [layer, { transform: `translate(${posX / q}px, ${posY / q}px)` }];
    }),
  ) as Record<Layers, CSSProperties>;

  return {
    layerRotation,
    positionStyles,
    watchMouse,
  };
};
