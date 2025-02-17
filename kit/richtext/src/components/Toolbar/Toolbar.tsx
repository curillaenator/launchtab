import React, { FC } from 'react';
import cn from 'classnames';
// import { v4 as getKey } from 'uuid';

import type { ToolbarProps } from './interfaces';
import { useToolbarObserver } from './hooks/useToolbarObserver';
import styles from './Toolbar.module.scss';

const ToolbarWithStruct: FC<ToolbarProps> = () => {
  // const { disabled } = props;

  const { containerRef, composition } = useToolbarObserver({});
  // const { left, right } = struct[composition] ?? struct['minimal'];

  return (
    <div ref={containerRef} className={cn(styles.toolbar, styles[`_${composition}`], styles.toolbar_top)}>
      <div className={cn(styles.toolbarBlock, styles[`_${composition}`])}>
        {/* {left.map((Component, i) => {
          const key = UNIQUE_KEYS.left[i];
          return <Component key={key} disabled={props.disabled} tocCfg={props.tocCfg} />;
        })} */}
      </div>

      <div className={cn(styles.toolbarBlock, styles[`_${composition}`])}>
        {/* {right.map((Component, i) => {
          const key = UNIQUE_KEYS.right[i];
          return <Component key={key} disabled={props.disabled} tocCfg={props.tocCfg} />;
        })} */}
      </div>
    </div>
  );
};

export { ToolbarWithStruct as Toolbar };
