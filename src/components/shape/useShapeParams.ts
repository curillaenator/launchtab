import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  MutableRefObject,
} from "react";

type TUseShapeParams = (
  isAdaptive: boolean,
  radius: number,
  height?: number
) => [number, number, string, MutableRefObject<SVGSVGElement | null>];

export const useShapeParams: TUseShapeParams = (isAdaptive, radius, height) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [WH, setWH] = useState([0, 0]);

  const setShapeSize = useCallback(() => {
    ref.current &&
      setWH([ref.current.clientWidth, height || ref.current.clientHeight]);
  }, []);

  useEffect(() => {
    setShapeSize();

    if (isAdaptive) {
      window.addEventListener("resize", setShapeSize);
      return () => window.removeEventListener("resize", setShapeSize);
    }
  }, []);

  const shapeData: [number, number, string] = useMemo(() => {
    const [W, H] = WH;
    const minHalf = Math.min(W / 2, H / 2);

    const R = 1.25 * radius > minHalf ? minHalf : 1.25 * radius;
    const S = 0.19 * R;

    const path = `M ${W - R} 0 C ${W - S} 0 ${W} ${S} ${W} ${R}
    V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
    H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
    V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`;

    return [W, H, path];
  }, [WH]);

  return [...shapeData, ref];
};

// const S = (0.08 + R * 0.000012) * smoothQ - 4 / smoothQ - 3;
