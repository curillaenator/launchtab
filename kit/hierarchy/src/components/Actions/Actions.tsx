import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
import cn from 'classnames';

// import DragIcon from '@sbt_swtr/kit-tracker.icon/dist/assets/solid/DragIcon';
import { Dropable, useControledDropdown, useAnimation, useCombineControledAnimated } from '@launch-ui/dropable';
// import { ButtonGhost } from '@launch-ui/button';

// import { useHierarchyContext } from '../../context';
// import { getPathKey } from '../../utils/getPathKey';

import type { ActionsProps } from './interfaces';
import styles from './action.module.scss';

export const Actions: FC<ActionsProps> = (props) => {
  const { setActionsOpened, setHovered } = props;
  // const { actions = [] } = useHierarchyContext();

  // const

  const controled = useControledDropdown();
  const animated = useAnimation();

  const { isOpen, ...combinedControled } = useCombineControledAnimated({
    controled,
    animated,
    rest: {
      onShow: () => {
        setActionsOpened(true);
      },
      onHide: () => {
        setActionsOpened(false);
        setHovered(false);
      },
    },
  });

  // const handleActionClick = (onClick: HierarchyItemAction['onClick']) => () => {
  //   setActionsOpened(false);
  //   setHovered(false);

  //   if (!onClick) {
  //     return false;
  //   }
  // };

  return (
    <Dropable
      {...combinedControled}
      offset={[0, 8]}
      placement='right-start'
      // appendToId={uniqueId}
      className={styles.actions}
      minWidth={64}
      openNode={
        <button
          type='button'
          className={cn(styles.trigger, {
            [styles.trigger_active]: isOpen,
          })}
        >
          {/* <DragIcon size='xl' className={styles.toggler} /> */}
        </button>
      }
    >
      <div>Hi </div>

      {/* {actions?.map(
        ({
          caption,
          // Icon,
          onClick,
          linkPattern,
        }) => {
          return (
            <Link to={linkPattern?.(item)}> {caption}</Link>
            
            <Button
              to={linkPattern?.(item)}
              // @ts-ignore
              component={linkPattern ? Link : 'button'}
              key={item.id}
              appearance='primary-transparent'
              justify='start'
              type='button'
              className={styles.item}
              onClick={handleActionClick(onClick)}
              IconLeft={Icon}
            >
              {caption}
            </Button>
          );
        },
      )} */}
    </Dropable>
  );
};
