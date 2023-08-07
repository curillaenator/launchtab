import type { ReactNode } from 'react';

export interface SelectProps {
  selected: string;
  options: { title: string; value: string }[];
  onChange: (value: string) => void;
  shevronIcon: ReactNode;
  optionHeight?: number;
}

export interface SelectStyledProps {
  open: boolean;
  bodyHeight: number;
}
