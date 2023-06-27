import React, { FC, useState, useMemo, type PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { usePortal } from '@launch-ui/utils';

import { ModalContext } from './context';
import { useCloseOnEscape } from './hooks/useCloseOnEscape';
import { Overlay } from './components/Overlay';
import type { DrawerProps } from './interfaces';

import { TransitionStyled, ContentStyled } from './drawer.styled';

export const Drawer: FC<PropsWithChildren<DrawerProps>> = (props) => {
  const { open, portalId, transitionClassName, contentClassName, children } = props;

  useCloseOnEscape(props);

  const portal = usePortal(portalId);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState<boolean>(false);
  const contextValue = useMemo(() => ({ isAnimationCompleted }), [isAnimationCompleted]);

  return ReactDOM.createPortal(
    <ModalContext.Provider value={contextValue}>
      <TransitionStyled
        appear
        show={open}
        unmount
        // as='div'
        className={transitionClassName}
        afterEnter={() => setIsAnimationCompleted(true)}
        afterLeave={() => setIsAnimationCompleted(false)}
      >
        <Overlay {...props} />
      </TransitionStyled>

      <ContentStyled closed={!open} className={cn(contentClassName, transitionClassName)}>
        {children}
      </ContentStyled>
    </ModalContext.Provider>,
    portal,
  );
};
