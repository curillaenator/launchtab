import React, { ElementType, FC, useMemo } from 'react';
import { animated } from 'react-spring';

import { DropableContext } from './context';
import { VERSION } from './version';
import { DEFAULT_TEST_ID } from './constants';
import { _BaseMenuProps } from './interfaces';

//@ts-expect-error
import styles from './dropable.module.scss';

export const DropableMenu: FC<_BaseMenuProps> = (props) => {
  const {
    attrs,
    instance,
    dataTestId,
    maxWidth,
    minWidth,
    maxHeight,
    animationStyle,
    closeOnItemClick = false,
    closeDropdown,
    children,
  } = props;

  // меню вынесено в отдельный компонент ради мемоизации контекста, так как напрямую хук не вызвать в колбеке
  const contextValue = useMemo(
    () => ({
      closeOnItemClick,
      closeDropdown: closeDropdown || instance?.hide,
    }),
    [closeOnItemClick, closeDropdown, instance],
  );

  const Component = animationStyle ? animated.div : ('div' as ElementType);

  return (
    <Component
      {...attrs}
      data-testid={dataTestId}
      data-analytics={DEFAULT_TEST_ID}
      data-version={VERSION}
      className={styles.content}
      style={{ minWidth, maxWidth, maxHeight, ...animationStyle }}
    >
      <div className={styles.scroll}>
        <DropableContext.Provider value={contextValue}>{children}</DropableContext.Provider>
      </div>
    </Component>
  );
};
