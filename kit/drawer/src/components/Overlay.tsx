import React, { useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useDisabledScroll, usePreventEvent } from '@launch-ui/utils';
import { OverlayStyled } from './overlay.styled';
import type { DrawerProps } from '../interfaces';

export const Overlay = (props: DrawerProps) => {
  const { disableBackgroundClick, onClose, overlayClassName } = props;
  const overlayRef = useRef<HTMLDivElement>(null);

  useDisabledScroll(document, window);
  usePreventEvent([overlayRef], 'touchmove');

  return (
    <Transition.Child
      as={Fragment}
      enter='overlay_enter'
      enterFrom='overlay_enter_from'
      enterTo='overlay_enter_to'
      leave='overlay_leave'
      leaveFrom='overlay_leave_from'
      leaveTo='overlay_leave_to'
    >
      <OverlayStyled
        ref={overlayRef}
        disableBackgroundClick={disableBackgroundClick}
        onClick={disableBackgroundClick ? undefined : onClose}
        className={overlayClassName}
      />
    </Transition.Child>
  );
};
