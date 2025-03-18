import React, { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import { Corners } from '@launch-ui/shape';
import { usePortal } from '@launch-ui/utils';

import { ModalOverlay } from './Overlay';
import { ModalContainer, ModalContent } from './modal.styled';

import { getAnimationCns } from './utils';

import type { ModalProps } from './interfaces';
import { Transition } from '@headlessui/react';

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { portalId, open, children, borderRadius = 32 } = props;

  const portal = usePortal(portalId);

  return ReactDOM.createPortal(
    <ModalContainer show={open} appear unmount>
      <ModalOverlay {...props} />

      <Transition.Child {...getAnimationCns('overlay')}>
        <ModalContent borderRadius={borderRadius}>
          <Corners borderRadius={borderRadius} />

          {children}
        </ModalContent>
      </Transition.Child>
    </ModalContainer>,
    portal,
  );
};

export { Modal };
