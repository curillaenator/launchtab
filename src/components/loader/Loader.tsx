import React, { FC, CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

const ROTATE = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DASH = keyframes`
  0% {
    stroke-dasharray: 0, 50;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 50, 50;
    stroke-dashoffset: 0px;
  }
  100% {
    stroke-dasharray: 50, 50;
    stroke-dashoffset: -50px;
  }
`;

interface LoaderProps {
  fullscreen?: boolean;
  size?: CSSProperties['width'];
}

const LoaderStyled = styled.div<LoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fullscreen }) => (fullscreen ? '100vw' : 'fit-content')};
  height: ${({ fullscreen }) => (fullscreen ? '100vh' : 'fit-content')};

  & > svg {
    transform-origin: center center;
    width: ${({ size }) => size};
    height: ${({ size }) => size};

    .animatedCircle {
      fill: none;
      stroke: ${({ theme }) => theme.primary[500]};
      stroke-width: 1.8px;
      transform-origin: center;
      stroke-linecap: round;
      animation: ${DASH} 1.6s linear infinite, ${ROTATE} 2s linear infinite;
    }
  }
`;

export const Loader: FC<LoaderProps> = ({ fullscreen, size }) => (
  <LoaderStyled fullscreen={fullscreen} size={size || '32px'}>
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <circle className='animatedCircle' cx='12' cy='12' r='8' />
    </svg>
  </LoaderStyled>
);
