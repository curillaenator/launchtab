import React, { useRef, Fragment } from 'react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
import { useDisabledScroll, usePreventEvent } from '@launch-ui/utils';

import { BaseDrawerProps } from '../interfaces';
import { overlayTransitions } from '../styles/styles';
import styles from '../styles/styles.module.scss';

export const Overlay = (props: BaseDrawerProps) => {
  const { dataTestId, disableBackgroundClick, onClose, overlayClassName } = props;

  const overlayRef = useRef<HTMLDivElement>(null);

  useDisabledScroll(document, window);
  usePreventEvent([overlayRef], 'touchmove');

  return (
    <Transition.Child as={Fragment} {...overlayTransitions}>
      <div
        ref={overlayRef}
        data-testid={`${dataTestId}.Overlay`}
        onClick={disableBackgroundClick ? undefined : onClose}
        className={cn(styles.overlay, overlayClassName, {
          [styles.overlay_noPointerEvents]: disableBackgroundClick,
        })}
      />
    </Transition.Child>
  );
};
