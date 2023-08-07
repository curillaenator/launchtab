import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { ButtonsIcons } from '../assets/icons';
import React from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isColorsStatic?: boolean;
  size?: 'medium' | 'large';
  leftIcon?: ButtonsIcons;
  rightIcon?: ButtonsIcons;
  active?: boolean;
  // disabled?: boolean;
  danger?: boolean;
  // type?: 'submit' | 'button';
  handler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isColorsStatic?: boolean;
  size?: 'medium' | 'large' | 'small';
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
  active?: boolean;
  danger?: boolean;
}

export interface IBtnGhost extends ButtonProps {
  colorPreset?: 'secondary-colors' | 'primary-colors';
}

type BtnIconOmit = 'title' | 'leftIcon' | 'rightIcon';
export interface IBtnIcon extends Omit<ButtonProps, BtnIconOmit> {
  iconName?: ButtonsIcons;
  imageURL?: string;
  isLoading?: boolean;
  imageHandler?: (url: string) => void;
}
