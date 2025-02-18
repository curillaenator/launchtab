import React, { FC } from 'react';
import { useClickHandler } from '@launch-ui/dropable';
import cn from 'classnames';

import { ToolbarButton } from '../ToolbarButton';

import { DEFAULT_TEST_ID } from '../../constants';
import type { DropdownIdProp, DropdownItemProps } from './interfaces';
import styles from './dropdown.module.scss';

export const DropdownItem: FC<DropdownItemProps<DropdownIdProp>> = (props) => {
  const { id, dataTestId, closeOnClick, onClick, active, disabled, Icon, caption, canTextOverflow } = props;
  const { clickHandler } = useClickHandler(() => onClick?.(props), closeOnClick);
  const title = canTextOverflow ? caption : undefined;

  return (
    <ToolbarButton
      data-itemid={id}
      data-testid={dataTestId || `${DEFAULT_TEST_ID}.Dropdown.Item`}
      active={active}
      disabled={disabled}
      onClick={clickHandler}
    >
      {Icon && <Icon />}

      <div className={cn(styles.itemCaption, { [styles.overflow]: canTextOverflow })} title={title}>
        {caption}
      </div>
    </ToolbarButton>
  );
};
