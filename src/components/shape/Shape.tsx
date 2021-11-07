import React, { FC } from "react";
import { useShapeParams } from "./useShapeParams";
import styled from "styled-components";

export const ShapeStyled = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  transition: 0.08s ease-in-out;
`;

interface IShape {
  borderRadius?: number;
  isAdaptive?: boolean;
  height?: number;
  className?: string;
}

export const Shape: FC<IShape> = ({
  borderRadius = 24,
  isAdaptive = false,
  height,
  className = "rounded-shape",
}) => {
  const [W, H, path, ref] = useShapeParams(isAdaptive, borderRadius, height);

  return (
    <ShapeStyled
      ref={ref}
      className={className}
      version="1.1"
      shapeRendering="geometricPrecision"
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </ShapeStyled>
  );
};
