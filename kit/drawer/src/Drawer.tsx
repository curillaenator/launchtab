import React, { FC, useState, useMemo, type PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
import { usePortal } from '@launch-ui/utils';

import { ModalContext } from './context';
import { useCloseOnEscape } from './hooks/useCloseOnEscape';
import { Overlay } from './components/Overlay';
import type { DrawerProps } from './interfaces';

import styles from './styles/styles.module.scss';

export const Drawer: FC<PropsWithChildren<DrawerProps>> = (props) => {
  const { open, portalId, transitionClassName, contentClassName, children, placement = 'right' } = props;

  useCloseOnEscape(props);

  const portal = usePortal(portalId);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState<boolean>(false);
  const contextValue = useMemo(() => ({ isAnimationCompleted }), [isAnimationCompleted]);

  return ReactDOM.createPortal(
    <ModalContext.Provider value={contextValue}>
      <Transition
        appear
        show={open}
        unmount
        as='div'
        className={cn(styles.overlayTransition, transitionClassName)}
        afterEnter={() => setIsAnimationCompleted(true)}
        afterLeave={() => setIsAnimationCompleted(false)}
      >
        <Overlay {...props} />
      </Transition>

      <div
        className={cn(styles.content, styles[`content_${placement}`], contentClassName, transitionClassName, {
          [styles.content_closed]: !open,
        })}
      >
        {children}
      </div>
    </ModalContext.Provider>,
    portal,
  );
};
