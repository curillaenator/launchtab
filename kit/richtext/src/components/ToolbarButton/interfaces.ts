import { ButtonHTMLAttributes } from 'react';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  dataTestId?: string;
  isDropdownTrigger?: boolean;
}

export type { ToolbarButtonProps };
