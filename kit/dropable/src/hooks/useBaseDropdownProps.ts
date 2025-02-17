import { useState, useCallback } from 'react';
import { TippyProps } from '@tippyjs/react';
import { Instance } from 'tippy.js';
import cn from 'classnames';

import { DropableProps } from '../interfaces';
import styles from '../styles/styles.module.scss';

interface InternalDropableProps {
  visible?: boolean;
  mounted?: boolean;
  openDropdown?: () => void;
}

interface ExtendedBaseDropdownProps extends DropableProps {
  appendTo: TippyProps['appendTo'];
  getOpenNodeWidth: (openNodeWidth?: number) => void;
  getDropdownScrollHeight: (fullScrollHeight?: number) => void;
  onMount?: (instance: Instance) => void;
}

export const useBaseDropdownProps = (
  props: DropableProps & InternalDropableProps,
): ExtendedBaseDropdownProps & InternalDropableProps => {
  const {
    // propguard
    mounted,
    openDropdown,

    trigger = 'click',
    visible,

    appendToId,

    matchWidth,
    minWidth,
    maxWidth,
    maxHeight,

    placement = 'bottom-end',
    interactive = true,
    disabled = false,

    className,
    scrollClassName,
    openNodeClassName,

    getOpenNodeWidth: getOpenNodeWidthFromOutside = () => {},

    ...rest
  } = props;

  const [openNodeWidth, setOpenNodeWidth] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  // получение ширины элемента, по клику на который открывается дропдаун. Нужно для реализации матча ширины меню под ширину элемента.
  const getOpenNodeWidth: ExtendedBaseDropdownProps['getOpenNodeWidth'] = useCallback(
    (clientWidth) => {
      if (clientWidth) {
        setOpenNodeWidth(clientWidth);
        getOpenNodeWidthFromOutside(clientWidth);
      }
    },
    [getOpenNodeWidthFromOutside],
  );

  // получение полной высоты контента, нужно для корректной работы скролла в меню
  const getDropdownScrollHeight: ExtendedBaseDropdownProps['getDropdownScrollHeight'] = useCallback(
    (fullScrollHeight) => {
      if (typeof fullScrollHeight === 'number') setScrollHeight(fullScrollHeight);
    },
    [],
  );

  return {
    ...rest,
    placement,
    visible,
    trigger: visible === undefined ? trigger : undefined,
    interactive,
    appendTo: appendToId ? document.getElementById(appendToId) || 'parent' : 'parent',
    minWidth: matchWidth ? openNodeWidth : minWidth,
    maxWidth: matchWidth ? openNodeWidth : maxWidth,
    maxHeight,
    disabled,
    getOpenNodeWidth,
    getDropdownScrollHeight,
    className: cn(styles.content, className),
    openNodeClassName: cn(styles.openNode, openNodeClassName, {
      [styles.openNode_disabled]: disabled,
    }),
    scrollClassName: cn(styles.scroll, scrollClassName, {
      [styles.scroll_scrollable]: scrollHeight > ((maxHeight as number) || 9999),
    }),
  };
};
