import React, { FC, useEffect, useMemo, CSSProperties } from 'react';
import { useUnit as useEffectoUnit } from 'effector-react';

import cn from 'classnames';

import { getHeight } from './utils/getHeight';
import { ITEM_HEIGHT } from './constants';

import { $hierarchyStore, registerHierarchyItem } from './service/store';
import { HierarchyContextProvider } from './context';

import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';

import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { onHeightChanged = () => {}, rootItems } = props;

  useEffect(() => {
    rootItems.forEach((dtoHierItem) => registerHierarchyItem({ ...dtoHierItem, path: [] }));
  }, [rootItems]);

  const store = useEffectoUnit($hierarchyStore);

  const currentHeight = useMemo(
    () =>
      ITEM_HEIGHT * rootItems.length + rootItems.map(({ code }) => getHeight([code], store)).reduce((a, b) => a + b, 0),
    [rootItems, store],
  );

  useEffect(() => {
    onHeightChanged(currentHeight);
  }, [currentHeight, onHeightChanged]);

  return (
    <HierarchyContextProvider value={props}>
      <ul
        className={cn(styles.container, styles.themeVars_light)}
        style={{ '--hchy-container-h': `${currentHeight}px` } as CSSProperties}
      >
        {rootItems.map((item) => (
          <Foldable key={item.code} code={item.code} path={[item.code]} data={item} />
        ))}
      </ul>
    </HierarchyContextProvider>
  );
};
