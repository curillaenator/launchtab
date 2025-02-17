import React, { FC } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Instance } from 'tippy.js';

import { useBaseDropdownProps } from './hooks/useBaseDropdownProps';
import { DropableMenu } from './DropableMenu';
import { DEFAULT_TEST_ID, PLUGINS } from './constants';
import { VERSION } from './version';
import { DropableProps } from './interfaces';

export const Dropable: FC<DropableProps> = (props) => {
  const {
    dataTestId = DEFAULT_TEST_ID,
    openNode,
    children,
    className,
    scrollClassName,
    openNodeClassName,
    maxWidth = 256,
    minWidth = 216,
    maxHeight = 320,
    animationStyle,
    closeOnItemClick,
    closeDropdown,
    getOpenNodeWidth,
    getDropdownScrollHeight,
    ...rest
  } = useBaseDropdownProps(props);

  return (
    <Tippy
      {...rest}
      maxWidth='none'
      arrow={false}
      plugins={PLUGINS}
      render={(attrs, _content, instance) => (
        <DropableMenu
          attrs={attrs}
          dataTestId={dataTestId}
          instance={instance as Instance}
          getDropdownScrollHeight={getDropdownScrollHeight}
          closeDropdown={closeDropdown}
          className={className}
          scrollClassName={scrollClassName}
          maxWidth={maxWidth}
          minWidth={minWidth}
          maxHeight={maxHeight}
          animationStyle={animationStyle}
          closeOnItemClick={closeOnItemClick}
        >
          {children}
        </DropableMenu>
      )}
    >
      <div
        data-testid={`${dataTestId}.OpenNode`}
        data-analytics={DEFAULT_TEST_ID}
        data-version={VERSION}
        ref={(inst) => getOpenNodeWidth(inst?.clientWidth)}
        className={openNodeClassName}
      >
        {openNode}
      </div>
    </Tippy>
  );
};
