import React, { FC, useEffect, useMemo, CSSProperties } from 'react';
import { useUnit as useEffectoUnit } from 'effector-react';
import { toPairs } from 'lodash';

import cn from 'classnames';

import { getHeight } from './utils/getHeight';
import { ITEM_HEIGHT } from './constants';

import { $hierarchyStore } from './service/store';
import { HierarchyContextProvider } from './context';

import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';

import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { onHeightChanged = () => {}, rootItemsIds } = props;

  const store = useEffectoUnit($hierarchyStore);

  const currentHeight = useMemo(() => {
    const rootCodes = toPairs(rootItemsIds).map(([rootCode]) => rootCode);

    return (
      ITEM_HEIGHT * rootCodes.length + rootCodes.map((code) => getHeight([code], store)).reduce((a, b) => a + b, 0)
    );
  }, [rootItemsIds, store]);

  useEffect(() => {
    onHeightChanged(currentHeight);
  }, [currentHeight, onHeightChanged]);

  return (
    <HierarchyContextProvider value={props}>
      <ul
        className={cn(styles.container, styles.themeVars_light)}
        style={{ '--hchy-container-h': `${currentHeight}px` } as CSSProperties}
      >
        {toPairs(rootItemsIds)
          .map(([rootCode]) => rootCode)
          .map((code) => (
            <Foldable key={code} code={code} path={[code]} />
          ))}
      </ul>
    </HierarchyContextProvider>
  );
};
