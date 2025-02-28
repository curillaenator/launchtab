import React, { FC, useEffect, useState } from 'react';
import { useUnit as UseEffectorUnit } from 'effector-react';
import cn from 'classnames';

import { $hierarchyStore, registerHierarchyItem, HIERARCHY_ITEMS_DATA } from '../../service/store';
import { useHierarchyContext } from '../../context';

import { getPathKey } from '../../utils/getPathKey';
import { mapDtoToServiceItem } from '../../utils/mapDtoToServiceItem';

// import { Actions } from '../Actions';
import { Spinner } from '../Spinner';
import { DocumentLink } from '../DocumentLink';

// import { useDragNDrop } from './hooks/useDragNDrop';
// import { useActiveWatch } from './hooks/useActiveWatch';

import { CaretRightIcon } from './icons/CaretRightIcon';
import { DotSmallIcon } from './icons/DotSmallIcon';

// import { getHeight } from '../../utils/getHeight';

import { HierarchyItem, HierarchyServiceItem } from '../../interfaces';

import styles from './styles.module.scss';

export const Foldable: FC<HierarchyServiceItem> = (props) => {
  const { code, path } = props;

  const pathKey = getPathKey(path);

  const { isPending, isExpanded } = UseEffectorUnit($hierarchyStore)[pathKey];

  const hierarchyItemData = HIERARCHY_ITEMS_DATA.get(pathKey) as HierarchyItem;

  const { onAsyncLoad } = useHierarchyContext();

  // useEffect(() => {
  // if (!store[pathKey]) registerHierarchyItem(props);
  // api.registerItem(id);
  // return () => {
  // api.unregisterItem(id);
  // };
  // }, []);

  const [isActive, setActive] = useState(false);
  // const [isActionsOpened, setActionsOpened] = useState(false);
  const [isHovered, setHovered] = useState(false);

  // const { liDropHandlers } = useDragNDrop(props);
  // useActiveWatch(props, setActive);

  const hasChildren = !!hierarchyItemData?.children?.length;

  // const currentHeight = getHeight(props, state);

  console.log('HIERARCHY_ITEMS_DATA', HIERARCHY_ITEMS_DATA);

  return (
    <li
      // {...liDropHandlers}
      // draggable={isDraggable}
      className={styles.li}
    >
      <div
        data-code={code}
        className={cn(styles.trigger, {
          // [styles.trigger_isDrag]: itemState.isDrag,
          [styles.trigger_isActive]: isActive,
        })}
        // onMouseLeave={() => {
        // if (!isActionsOpened) {
        //   setHovered(false);
        // }
        // }}
      >
        {isPending && <Spinner />}

        {!isPending && !hasChildren && <DotSmallIcon />}

        {!isPending && hasChildren && (
          <button
            type='button'
            className={styles.iconButton}
            onClick={() => {
              if (!!hierarchyItemData.children?.length) {
                // api.toggleExpanded(id);
              }

              if (!hierarchyItemData.children?.length && onAsyncLoad) {
                onAsyncLoad({ ...hierarchyItemData }).then(() => {
                  // api.togglePending(id, false);
                  // api.toggleExpanded(id, true);
                });
              }
            }}
          >
            <div className={cn(styles.carret, { [styles.carret_opened]: isExpanded })}>
              <CaretRightIcon />
            </div>
            <CaretRightIcon />
          </button>
        )}

        {hierarchyItemData && (
          <DocumentLink item={hierarchyItemData} setHovered={setHovered} isHovered={isHovered} isActive={isActive} />
        )}

        {/* {!!actions?.length && && isHovered && (
          <Actions item={props} setActionsOpened={setActionsOpened} setHovered={setHovered} />
        )} */}
      </div>

      <ul
        id={pathKey}
        className={cn(styles.ulList, {
          [styles.ulList_folded]: !hasChildren,
          // [styles.list_isDrag]: itemState.isDrag,
        })}
        // style={{ '--list-foldable-mah': `${currentHeight}px` } as React.CSSProperties}
      >
        {mapDtoToServiceItem(hierarchyItemData?.children, path).map((item) => (
          <Foldable {...item} key={item.code} path={[...path, item.code]} />
        ))}
      </ul>
    </li>
  );
};
