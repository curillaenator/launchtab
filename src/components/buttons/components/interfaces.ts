import type { HTMLAttributes, MouseEvent } from 'react';
import { ButtonsIcons } from '../assets/icons';

export interface Button extends HTMLAttributes<HTMLButtonElement> {
  // title?: string | number;
  isColorsStatic?: boolean;
  size?: 'medium' | 'large';
  leftIcon?: ButtonsIcons;
  rightIcon?: ButtonsIcons;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  type?: 'submit' | 'button';
  handler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IBtnGhost extends Button {
  colorPreset?: 'secondary-colors' | 'primary-colors';
}

type BtnIconOmit = 'title' | 'leftIcon' | 'rightIcon';
export interface IBtnIcon extends Omit<Button, BtnIconOmit> {
  iconName?: ButtonsIcons;
  imageURL?: string;
  isLoading?: boolean;
  imageHandler?: (url: string) => void;
}
