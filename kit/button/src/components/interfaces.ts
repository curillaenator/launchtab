import type { FC, ButtonHTMLAttributes, SVGAttributes, CSSProperties } from 'react';
import React from 'react';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
  active?: boolean;
}

export interface ButtonActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  LeftIcon?: FC<SVGAttributes<SVGElement>>;
  RightIcon?: FC<SVGAttributes<SVGElement>>;
  active?: boolean;
  danger?: boolean;
  height?: CSSProperties['height'];
}

export interface ButtonGhostProps extends ButtonActionProps {
  colorPreset?: 'secondary-colors' | 'primary-colors';
  height?: CSSProperties['height'];
}
