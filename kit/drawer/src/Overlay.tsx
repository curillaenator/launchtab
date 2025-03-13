import React, { useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useDisabledScroll, usePreventEvent } from '@launch-ui/utils';
import type { DrawerProps } from './interfaces';

import { getAnimationCns } from './utils';
import { DrawerOverlay } from './drawer.styled';

const Overlay = (props: DrawerProps) => {
  const { onClose } = props;
  const overlayRef = useRef<HTMLDivElement>(null);

  useDisabledScroll(document, window);
  usePreventEvent([overlayRef], 'touchmove');

  return (
    <Transition.Child {...getAnimationCns('overlay')}>
      <DrawerOverlay ref={overlayRef} onClick={onClose} />
    </Transition.Child>
  );
};

export { Overlay as DrawerOverlay };
