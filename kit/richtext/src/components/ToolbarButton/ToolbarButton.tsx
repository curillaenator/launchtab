import React, { FC, forwardRef } from 'react';
import cns from 'classnames';

import type { ToolbarButtonProps } from './interfaces';
import styles from './ToolbarButton.module.scss';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { type = 'button', children, className, dataTestId, active = false, ...rest } = props;

  return (
    <button
      {...rest}
      type={type ?? 'button'}
      data-testid={dataTestId}
      className={cns(styles.button, className, {
        [styles.active]: active,
        [styles.disabled]: props.disabled,
      })}
    >
      {children}
    </button>
  );
};
