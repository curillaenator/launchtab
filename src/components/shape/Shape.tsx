import React, { FC } from 'react';
import { useShapeParams } from './useShapeParams';
import styled from 'styled-components';

export const ShapeStyled = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  transition: 0.08s ease-in-out;
  margin: 0 auto;
`;

export interface ShapeProps {
  borderRadius?: number;
  isAdaptive?: boolean; // deprecated, need to clear everywhere
  contractXBy?: number;
  contractYBy?: number;
  height?: number;
  className?: string;
}

export const Shape: FC<ShapeProps> = (props) => {
  const { W, H, path, ref } = useShapeParams(props);

  return (
    <ShapeStyled
      ref={ref}
      className={props.className || 'rounded-shape'}
      version='1.1'
      shapeRendering='geometricPrecision'
      viewBox={`0 0 ${W} ${H}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d={path} />
    </ShapeStyled>
  );
};
