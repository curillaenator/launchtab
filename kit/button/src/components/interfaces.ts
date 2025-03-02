import type { FC, ButtonHTMLAttributes, SVGAttributes, CSSProperties } from 'react';
import React from 'react';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
  active?: boolean;
  // appearance?: 'primary' | 'secondary';
}

export interface ButtonActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  LeftIcon?: FC<SVGAttributes<SVGElement>>;
  RightIcon?: FC<SVGAttributes<SVGElement>>;
  active?: boolean;
  fullwidth?: boolean;
  height?: CSSProperties['height'];
  appearance?: 'primary' | 'secondary';
}

export interface ButtonGhostProps extends ButtonActionProps {
  colorPreset?: 'secondary-colors' | 'primary-colors';
  height?: CSSProperties['height'];
}
