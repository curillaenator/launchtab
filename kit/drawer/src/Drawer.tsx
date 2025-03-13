import React, { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import { usePortal } from '@launch-ui/utils';

import { useCloseOnEscape } from './hooks/useCloseOnEscape';
import { getAnimationCns } from './utils';

import type { DrawerProps } from './interfaces';

import { DrawerOverlay } from './Overlay';
import { DrawerContainer, DrawerContent } from './drawer.styled';

const Drawer: FC<PropsWithChildren<DrawerProps>> = (props) => {
  const { open, portalId, contentClassName, children } = props;

  useCloseOnEscape(props);

  const portal = usePortal(portalId);

  return ReactDOM.createPortal(
    <DrawerContainer appear show={open} unmount>
      <DrawerOverlay {...props} />

      <Transition.Child {...getAnimationCns('content')}>
        <DrawerContent className={contentClassName}>{children}</DrawerContent>
      </Transition.Child>
    </DrawerContainer>,
    portal,
  );
};

export { Drawer };
