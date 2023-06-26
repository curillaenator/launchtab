import { useEffect, useCallback, useRef, useContext } from 'react';

import { ModalContext } from '../context';

interface Options {
  hasCloseButton?: boolean;
}

type A11yRef = {
  content: HTMLDivElement | null;
  first: HTMLElement | null;
  last: HTMLElement | null;
  tabables: HTMLElement[];
};

const TABABLES = [
  'a[href]:not([disabled])',
  'button:not([disabled]):not([tabIndex="-1"])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'div[tabIndex]:not([tabIndex="-1"])',
  'span[tabIndex]:not([tabIndex="-1"])',
];

export const useAccessibility = (options: Options) => {
  const { hasCloseButton } = options;
  const { isAnimationCompleted } = useContext(ModalContext);

  const a11y = useRef<A11yRef>({
    content: null,
    first: null,
    last: null,
    tabables: [],
  });

  const focusFirstElement = useCallback(() => {
    const { tabables } = a11y.current;

    if (hasCloseButton) {
      /* eslint-disable-next-line */
      !!tabables[1] ? tabables[1].focus() : tabables[0]?.focus(); // фокус на первый элемент после кнопки закрытия
    } else {
      tabables[0]?.focus(); // при наличии дефолтной кнопки закрытия нулевой элемент - это кнопка закрытия
    }
  }, [hasCloseButton]);

  const updateContentInstance = useCallback((instance: HTMLDivElement | null) => {
    if (!instance) return;

    const elements = instance.querySelectorAll(TABABLES.join(', ')) as unknown as HTMLElement[];

    a11y.current.content = instance;
    a11y.current.tabables = elements;
    /* eslint-disable-next-line */
    a11y.current.first = elements[0];
    a11y.current.last = elements[elements.length - 1];
  }, []);

  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      if (!['Tab'].includes(e.code)) return;

      const { first, last, tabables } = a11y.current;

      if (tabables.length === 0) {
        e.preventDefault();
        return;
      }

      if (hasCloseButton && tabables.length === 1) {
        e.preventDefault();
        first?.focus();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [hasCloseButton],
  );

  useEffect(() => {
    if (isAnimationCompleted) focusFirstElement();
  }, [isAnimationCompleted, focusFirstElement]);

  useEffect(() => {
    document.body.addEventListener('keydown', handleTabKey);
    return () => document.body.removeEventListener('keydown', handleTabKey);
  }, [handleTabKey]);

  return { updateContentInstance };
};
