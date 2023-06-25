import type { HTMLAttributes } from 'react';

export interface ShapeProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  fixedHeight?: number;
  className?: string;
  isGradient?: boolean;
  gradientDirection?: 'right' | 'left' | 'bottom' | 'top';
  stroke?: number;
  defferedRender?: boolean;
}

export interface CornerProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  isGradient?: boolean;
  gradientDirection?: 'right' | 'left' | 'bottom' | 'top';
  stroke?: number;
}
