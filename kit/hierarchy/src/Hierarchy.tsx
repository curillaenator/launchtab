import React, { FC, useEffect } from 'react';
import { toPairs } from 'lodash';
import cn from 'classnames';

import { resetHierarchyStore } from './service/store';
import { HierarchyContextProvider } from './context';
import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';
import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { rootItemsIds } = props;

  useEffect(() => () => resetHierarchyStore(), [rootItemsIds]);

  return (
    <HierarchyContextProvider value={props}>
      <ul className={cn(styles.container, styles.themeVars_light)}>
        {toPairs(rootItemsIds)
          .map(([rootCode]) => rootCode)
          .map((code) => (
            <Foldable key={code} code={code} path={[]} />
          ))}
      </ul>
    </HierarchyContextProvider>
  );
};
