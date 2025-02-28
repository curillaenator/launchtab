import React, { FC, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { toPairs } from 'lodash';
import cn from 'classnames';

import { $hierarchyStore } from './service/store';

// import { getHeight } from './utils/getHeight';
// import { ITEM_HEIGHT } from './constants';

import { registerHierarchyItem } from './service/store';
import { HierarchyContextProvider } from './context';

import type { HierarchyProps } from './interfaces';

import { Foldable } from './components/Foldable';
import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const {
    // onHeightChanged = () => {},
    onAsyncLoad,
  } = props;

  const serviceStore = useEffectorUnit($hierarchyStore);

  useEffect(() => {
    onAsyncLoad?.(null).then((dtoItems) => {
      const sortedDtoItems = dtoItems.toSorted((a, b) => a.order - b.order);
      sortedDtoItems.forEach((dtoHirarcyItem) =>
        registerHierarchyItem({ ...dtoHirarcyItem, path: [dtoHirarcyItem.code] }),
      );
    });
  }, [onAsyncLoad]);

  const rootServiceItems = toPairs(serviceStore)
    .filter(([pathKey]) => pathKey.split('-').length === 1)
    .map((el) => el[1]);

  // const currentHeight = useMemo(() => {
  //   return ITEM_HEIGHT * items.length + items.map((item) => getHeight(item, state)).reduce((a, b) => a + b, 0);
  // }, [items, state]);

  // useEffect(() => {
  //   onHeightChanged(currentHeight);
  // }, [currentHeight, onHeightChanged]);

  return (
    <HierarchyContextProvider value={props}>
      <ul
        className={cn(styles.container, styles.themeVars_light)}
        // style={{ '--hchy-container-h': `${currentHeight}px` } as CSSProperties}
      >
        {rootServiceItems.map((item) => (
          <Foldable {...item} key={item.code} />
        ))}
      </ul>
    </HierarchyContextProvider>
  );
};
