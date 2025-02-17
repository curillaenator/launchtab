import React, { ElementType, FC, useMemo } from 'react';
import { animated } from 'react-spring';

import { DropableContext } from './context';
import { VERSION } from './version';
import { DEFAULT_TEST_ID } from './constants';
import { _BaseMenuProps } from './interfaces';

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
    getDropdownScrollHeight,
    className,
    scrollClassName,
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
    // @ts-ignore игнор для феба, проблема с несоответсвием типов, разобраться на какой стороне пофиксить
    <Component
      {...attrs}
      data-testid={dataTestId}
      data-analytics={DEFAULT_TEST_ID}
      data-version={VERSION}
      className={className}
      style={{ minWidth, maxWidth, maxHeight, ...animationStyle }}
    >
      <div ref={(inst) => getDropdownScrollHeight(inst?.scrollHeight)} className={scrollClassName}>
        {
          // @ts-ignore игнор для феба, проблема с несоответсвием типов, разобраться на какой стороне пофиксить
          <DropableContext.Provider value={contextValue}>{children}</DropableContext.Provider>
        }
      </div>
    </Component>
  );
};
