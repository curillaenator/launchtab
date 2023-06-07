import { useRef, useState, useEffect, useMemo } from 'react';

interface Options {
  isAdaptive: boolean;
  radius: number;
  height?: number;
}

export const useShapeParams = ({ radius, height: forcedHeight }: Options) => {
  const ref = useRef<SVGSVGElement>(null);

  const [W, setW] = useState(0);
  const [H, setH] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect();
      setW(width);
      setH(forcedHeight || height);
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [forcedHeight]);

  const shapeData: { W: number; H: number; path: string } = useMemo(() => {
    const minHalf = Math.min(W / 2, H / 2);

    const R = 1.25 * radius > minHalf ? minHalf : 1.25 * radius;
    const S = 0.19 * R;

    const path = `M ${W - R} 0 C ${W - S} 0 ${W} ${S} ${W} ${R}
    V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
    H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
    V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`;

    return { W, H, path };
  }, [W, H]);

  return { ...shapeData, ref };
};
