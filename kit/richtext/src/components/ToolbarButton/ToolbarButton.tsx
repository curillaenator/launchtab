import React, { FC } from 'react';
import cns from 'classnames';

import type { ToolbarButtonProps } from './interfaces';
import styles from './ToolbarButton.module.scss';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const {
    type = 'button',
    children,
    className,
    dataTestId,
    active = false,
    isDropdownTrigger,
    onClick,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type ?? 'button'}
      data-testid={dataTestId}
      className={cns(styles.button, className, {
        [styles.active]: active,
        [styles.disabled]: props.disabled,
      })}
      onClick={(e) => {
        if (isDropdownTrigger) {
          e.preventDefault();
          e.stopPropagation();

          return;
        }

        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
};
