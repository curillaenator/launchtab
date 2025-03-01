import React, { FC, useEffect, useMemo, CSSProperties } from 'react';
import { useUnit as useEffectoUnit } from 'effector-react';
import cn from 'classnames';

import { getHeight } from './utils/getHeight';
import { ITEM_HEIGHT } from './constants';

import { $hierarchyStore, registerHierarchyItem } from './service/store';
import { HierarchyContextProvider } from './context';
import { levelToFoldableMap } from './utils/levelToFoldableMap';

import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';

import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { onHeightChanged = () => {}, rootLevel, loadTreeLevel } = props;

  useEffect(() => {
    loadTreeLevel(rootLevel).then((dtoItems) => {
      dtoItems.forEach((dtoHierItem) => registerHierarchyItem({ ...dtoHierItem, path: [] }));
    });
  }, [rootLevel, loadTreeLevel]);

  const store = useEffectoUnit($hierarchyStore);

  const currentHeight = useMemo(() => {
    const items = levelToFoldableMap(rootLevel);
    return (
      ITEM_HEIGHT * items.length + items.map(([itemCode]) => getHeight([itemCode], store)).reduce((a, b) => a + b, 0)
    );
  }, [rootLevel, store]);

  useEffect(() => {
    onHeightChanged(currentHeight);
  }, [currentHeight, onHeightChanged]);

  return (
    <HierarchyContextProvider value={props}>
      <ul
        className={cn(styles.container, styles.themeVars_light)}
        style={{ '--hchy-container-h': `${currentHeight}px` } as CSSProperties}
      >
        {levelToFoldableMap(rootLevel).map(([code]) => (
          <Foldable key={code} code={code} path={[code]} />
        ))}
      </ul>
    </HierarchyContextProvider>
  );
};
