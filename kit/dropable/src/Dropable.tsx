import React, { FC, ReactElement, JSXElementConstructor } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Instance } from 'tippy.js';

import { useBaseDropdownProps } from './hooks/useBaseDropdownProps';
import { DropableMenu } from './DropableMenu';
import { DEFAULT_TEST_ID, PLUGINS } from './constants';
import { DropableProps } from './interfaces';

export const Dropable: FC<DropableProps> = (props) => {
  const {
    dataTestId = DEFAULT_TEST_ID,
    openNode,
    children,
    maxWidth = 256,
    minWidth = 216,
    maxHeight = 320,
    animationStyle,
    closeOnItemClick,
    closeDropdown,
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
          closeDropdown={closeDropdown}
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
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {openNode as ReactElement<any, string | JSXElementConstructor<any>>}
    </Tippy>
  );
};
