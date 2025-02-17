import { useRef, useState, useEffect, useCallback } from 'react';

interface PanZoomProps {
  enabled?: boolean;
  close?: () => void;
  prefix?: string;
}

interface ScalePanStore {
  scale: number;
  xPos: number;
  yPos: number;
}

const SCALE_STEP = 0.12;
const MIN_SCALE = 0.5;
const MAX_SCALE = 10;
const SCALE_PAN_INIT: ScalePanStore = { scale: 1, xPos: 0, yPos: 0 };

export const usePanZoom = (props?: PanZoomProps) => {
  const { enabled, close, prefix = 'panzoom' } = props || {};

  const startPos = useRef([0, 0]);
  const lastPos = useRef([0, 0]);

  const [panZoomStore, setPanZoomStore] = useState<ScalePanStore>(SCALE_PAN_INIT);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !imageContainerRef.current) return;

    imageContainerRef.current.querySelector('img')?.style.setProperty(
      'transform',
      `translate(var(--${prefix}-viewer-offset-x, 0), var(--${prefix}-viewer-offset-y, 0))
      scale(var(--${prefix}-viewer-scale, 1))`,
    );

    const { scale, xPos, yPos } = panZoomStore;

    imageContainerRef.current.style.setProperty(`--${prefix}-viewer-scale`, `${scale.toFixed(1)}`);
    imageContainerRef.current.style.setProperty(`--${prefix}-viewer-offset-x`, `${xPos}px`);
    imageContainerRef.current.style.setProperty(`--${prefix}-viewer-offset-y`, `${yPos}px`);
  }, [enabled, panZoomStore, prefix]);

  const onPan = useCallback((e: MouseEvent) => {
    const { pageX, pageY } = e;
    const [startX, startY] = startPos.current;
    const [lastX, lastY] = lastPos.current;

    setPanZoomStore((prev) => ({
      ...prev,
      xPos: -startX + pageX + lastX,
      yPos: -startY + pageY + lastY,
    }));
  }, []);

  const onPanZoomReset = useCallback(() => {
    setPanZoomStore(SCALE_PAN_INIT);
    startPos.current = [0, 0];
    lastPos.current = [0, 0];
  }, []);

  const onClose = useCallback(() => {
    onPanZoomReset();
    close?.();
  }, [onPanZoomReset, close]);

  const onPanStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      startPos.current = [e.pageX, e.pageY];

      imageContainerRef.current?.addEventListener('mousemove', onPan);
    },
    [panZoomStore, onPan], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onPanEnd = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const { xPos, yPos } = panZoomStore;

      lastPos.current = [xPos, yPos];

      imageContainerRef.current?.removeEventListener('mousemove', onPan);
    },
    [panZoomStore, onPan],
  );

  const onZoomByWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const scaleValue = panZoomStore.scale;

      if (e.deltaY > 0) {
        const nextScaleValue = scaleValue + SCALE_STEP;
        setPanZoomStore((prev) => ({
          ...prev,
          scale: nextScaleValue > MAX_SCALE ? MAX_SCALE : nextScaleValue,
        }));
      } else {
        const nextScaleValue = scaleValue - SCALE_STEP;
        setPanZoomStore((prev) => ({
          ...prev,
          scale: nextScaleValue < MIN_SCALE ? MIN_SCALE : nextScaleValue,
        }));
      }
    },
    [panZoomStore],
  );

  const zoomIn = useCallback(
    () =>
      setPanZoomStore((prev) => {
        const nextScaleV = prev.scale + SCALE_STEP * 3;
        if (nextScaleV > MAX_SCALE) return { ...prev, scale: MAX_SCALE };
        return { ...prev, scale: nextScaleV };
      }),
    [],
  );

  const zoomOut = useCallback(
    () =>
      setPanZoomStore((prev) => {
        const nextScaleV = prev.scale - SCALE_STEP * 3;
        if (nextScaleV < MIN_SCALE) return { ...prev, scale: MIN_SCALE };
        return { ...prev, scale: nextScaleV };
      }),
    [],
  );

  return {
    ...panZoomStore,

    isTouched:
      panZoomStore.scale !== SCALE_PAN_INIT.scale ||
      panZoomStore.yPos !== SCALE_PAN_INIT.yPos ||
      panZoomStore.xPos !== SCALE_PAN_INIT.xPos,

    imageContainerRef,

    onPanStart,
    onPanEnd,
    onZoomByWheel,

    zoomIn,
    zoomOut,

    onClose,
    onPanZoomReset,
  };
};
