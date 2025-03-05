import React, { FC } from 'react';
import { toPairs } from 'lodash';
import cn from 'classnames';

import { HierarchyContextProvider } from './context';
import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';
import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => (
  <HierarchyContextProvider value={props}>
    <ul className={cn(styles.container, styles.themeVars_light)}>
      {toPairs(props.rootItemsIds)
        .map(([rootCode]) => rootCode)
        .map((code) => (
          <Foldable key={code} code={code} path={[]} />
        ))}
    </ul>
  </HierarchyContextProvider>
);
