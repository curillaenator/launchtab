import React, { FC } from 'react';
import cn from 'classnames';
import { v4 as getKey } from 'uuid';

import type { ToolbarProps } from './interfaces';
import { useToolbarObserver } from './hooks/useToolbarObserver';

import { DEFAULT_STRUCT } from './constants';
import styles from './Toolbar.module.scss';

const ToolbarWithStruct: FC<ToolbarProps> = (props) => {
  const { disabled, richtextViewId } = props;

  const {
    containerRef,
    // composition
  } = useToolbarObserver({});
  const { left } = DEFAULT_STRUCT.full;

  return (
    <div
      id={'rich-text-toolbar'}
      ref={containerRef}
      className={cn(
        styles.toolbar,
        // styles[`_${composition}`],
        styles[`_full`],
        styles.toolbar_top,
      )}
    >
      <div
        className={cn(
          styles.toolbarBlock,
          // styles[`_${composition}`],
          styles[`_full`],
        )}
      >
        {left.map((Component) => (
          <Component key={getKey()} disabled={disabled} richtextViewId={richtextViewId} />
        ))}
      </div>

      <div className={cn(styles.toolbarBlock, styles[`_full`])}>
        {/* {right.map((Component, i) => {
          const key = UNIQUE_KEYS.right[i];
          return <Component key={key} disabled={props.disabled} tocCfg={props.tocCfg} />;
        })} */}
      </div>
    </div>
  );
};

export { ToolbarWithStruct as Toolbar };
