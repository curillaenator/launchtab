import React, { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUnit as UseEffectorUnit } from 'effector-react';
// import { useParams } from 'react-router-dom';
import { keys } from 'lodash';
import cn from 'classnames';

import { $hierarchyStore, registerHierarchyItem, updateHierarchy, HIERARCHY_ITEMS_DATA } from '../../service/store';
import { useHierarchyContext } from '../../context';

import { getPathKey } from '../../utils/getPathKey';

// import { Actions } from '../Actions';
import { Spinner } from '../Spinner';
import { DocumentLink } from '../DocumentLink';

// import { useDragNDrop } from './hooks/useDragNDrop';

import { CaretRightIcon } from './icons/CaretRightIcon';
import { DotSmallIcon } from './icons/DotSmallIcon';

import { getHeight } from '../../utils/getHeight';

import styles from './styles.module.scss';

interface FoldableProps {
  code: string;
  path: string[];
}

export const Foldable: FC<FoldableProps> = (props) => {
  const { code, path } = props;

  const pathKey = getPathKey(path);
  const store = UseEffectorUnit($hierarchyStore);
  const { queryKey: ITEMS_QUERY_KEY, getItemQuery, ItemLoader } = useHierarchyContext();

  const { isExpanded } = store[pathKey] || {};

  const [touched, setTouched] = useState<boolean>(false);

  // const [isActive, setActive] = useState(false);
  // const [isActionsOpened, setActionsOpened] = useState(false);
  // const [isHovered, setHovered] = useState(false);

  const { data: unitData, isLoading: isUnitLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY, code],
    queryFn: () => getItemQuery(code),
    enabled: !!code,
  });

  useEffect(() => {
    if (!!unitData) registerHierarchyItem({ ...unitData, path });
    // childrenData.forEach((child) => registerHierarchyItem({ ...child, path }));
  }, [unitData]);

  // const { liDropHandlers } = useDragNDrop(props);
  // useActiveWatch(props, (activeState: boolean) =>
  //   updateHierarchy({
  //     path,
  //     serviceItem: { ...store[pathKey], isActive: activeState },
  //   }),
  // );

  const hasChildren = !!unitData?.hierarchy;
  const currentHeight = getHeight(path, store);

  return (
    <li
      // {...liDropHandlers}
      // draggable={isDraggable}
      className={styles.li}
    >
      <div
        data-element='trigger'
        data-code={code}
        className={cn(styles.trigger, {
          // [styles.trigger_isDrag]: itemState.isDrag,
          // [styles.trigger_isActive]: noteId === data.code,
        })}
        // onMouseLeave={() => {
        // if (!isActionsOpened) {
        //   setHovered(false);
        // }
        // }}
      >
        {isUnitLoading && (ItemLoader ? <ItemLoader /> : <Spinner />)}

        {!isUnitLoading && !hasChildren && <DotSmallIcon />}

        {!isUnitLoading && !!hasChildren && (
          <button
            type='button'
            className={styles.iconButton}
            onClick={() => {
              setTouched(true);
              updateHierarchy({ path, serviceItem: { ...store[pathKey], isExpanded: !store[pathKey].isExpanded } });
            }}
          >
            <div className={cn(styles.carret, { [styles.carret_opened]: isExpanded })}>
              <CaretRightIcon />
            </div>
          </button>
        )}

        {unitData && (
          <DocumentLink
            item={unitData}
            // setHovered={setHovered} isHovered={isHovered} isActive={isActive}
          />
        )}

        {/* {!!actions?.length && && isHovered && (
          <Actions item={props} setActionsOpened={setActionsOpened} setHovered={setHovered} />
        )} */}
      </div>

      <ul
        id={pathKey}
        data-element={`child-list-${pathKey}`}
        className={cn(styles.ulList, {
          [styles.ulList_folded]: !isExpanded,
          // [styles.list_isDrag]: itemState.isDrag,
        })}
        style={{ '--list-foldable-mah': `${currentHeight}px` } as React.CSSProperties}
      >
        {touched &&
          unitData?.hierarchy &&
          keys(unitData.hierarchy).map((childCode) => (
            <Foldable key={childCode} code={childCode} path={[...path, childCode]} />
          ))}
      </ul>
    </li>
  );
};
