import React, { FC, useState } from 'react';
import { useUnit as UseEffectorUnit } from 'effector-react';
import cn from 'classnames';

import { $hierarchyStore, registerHierarchyItem, updateHierarchy, HIERARCHY_ITEMS_DATA } from '../../service/store';
import { useHierarchyContext } from '../../context';

import { getPathKey } from '../../utils/getPathKey';
import { levelToFoldableMap } from '../../utils/levelToFoldableMap';

// import { Actions } from '../Actions';
import { Spinner } from '../Spinner';
import { DocumentLink } from '../DocumentLink';

// import { useDragNDrop } from './hooks/useDragNDrop';
// import { useActiveWatch } from './hooks/useActiveWatch';

import { CaretRightIcon } from './icons/CaretRightIcon';
import { DotSmallIcon } from './icons/DotSmallIcon';

// import { getHeight } from '../../utils/getHeight';

import { HierarchyItem, HierarchyState } from '../../interfaces';

import styles from './styles.module.scss';
import { keys } from 'lodash';

interface FoldableProps {
  code: string;
  path: string[];
}

const checkIfChildrenLoaded = (ids: string[], path: string[], store: HierarchyState) =>
  ids.every((id) => !!store[getPathKey([...path, id])]);

export const Foldable: FC<FoldableProps> = (props) => {
  const { code, path } = props;
  const { loadTreeLevel } = useHierarchyContext();

  const pathKey = getPathKey(path);

  const data = HIERARCHY_ITEMS_DATA.get(pathKey) as HierarchyItem;
  const store = UseEffectorUnit($hierarchyStore);

  const { isPending, isExpanded } = store[pathKey] || {};

  // const [isActive, setActive] = useState(false);

  // const [isActionsOpened, setActionsOpened] = useState(false);
  // const [isHovered, setHovered] = useState(false);

  // const { liDropHandlers } = useDragNDrop(props);
  // useActiveWatch(props, setActive);

  // const hasChildren = !!data?.hierarchy;

  // const currentHeight = getHeight(props, state);

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
          // [styles.trigger_isActive]: isActive,
        })}
        // onMouseLeave={() => {
        // if (!isActionsOpened) {
        //   setHovered(false);
        // }
        // }}
      >
        {isPending && <Spinner />}

        {!isPending && !data?.hierarchy && <DotSmallIcon />}

        {!isPending && !!data?.hierarchy && (
          <button
            type='button'
            className={styles.iconButton}
            onClick={() => {
              const isChildrenLoaded = checkIfChildrenLoaded(keys(data.hierarchy), path, store);

              if (!!isChildrenLoaded) {
                console.log('isChildrenLoaded', true, HIERARCHY_ITEMS_DATA);
                updateHierarchy({ path, serviceItem: { ...store[pathKey], isExpanded: !store[pathKey].isExpanded } });
              }

              if (!isChildrenLoaded && loadTreeLevel) {
                console.log('isChildrenLoaded', false, HIERARCHY_ITEMS_DATA);
                loadTreeLevel(data.hierarchy!)
                  .then((loadedItems) => {
                    loadedItems.forEach((loaded) => registerHierarchyItem({ ...loaded, path }));
                  })
                  .then(() => {
                    updateHierarchy({ path, serviceItem: { ...store[pathKey], isExpanded: true } });
                  });
              }
            }}
          >
            <div className={cn(styles.carret, { [styles.carret_opened]: isExpanded })}>
              <CaretRightIcon />
            </div>
          </button>
        )}

        {data && (
          <DocumentLink
            item={data}
            // setHovered={setHovered} isHovered={isHovered} isActive={isActive}
          />
        )}

        {/* {!!actions?.length && && isHovered && (
          <Actions item={props} setActionsOpened={setActionsOpened} setHovered={setHovered} />
        )} */}
      </div>

      <ul
        id={pathKey}
        className={cn(styles.ulList, {
          [styles.ulList_folded]: !isExpanded,
          // [styles.list_isDrag]: itemState.isDrag,
        })}
        // style={{ '--list-foldable-mah': `${currentHeight}px` } as React.CSSProperties}
      >
        {!!data?.hierarchy &&
          levelToFoldableMap(data.hierarchy).map(([code]) => (
            <Foldable key={code} code={code} path={[...path, code]} />
          ))}
      </ul>
    </li>
  );
};
