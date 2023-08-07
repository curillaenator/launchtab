import { useState, useRef, useDeferredValue, useCallback } from 'react';
import { useClickAway } from '@launch-ui/utils';
import type { SelectProps } from './interfaces';

const getTitle = (selected: string, options: SelectProps['options']) => {
  return options.find((opt) => opt.value === selected)?.title;
};

export const useSelectProps = (props: SelectProps) => {
  const { onChange, selected, options, ...rest } = props;

  const [open, setOpen] = useState(false);
  const defferedOpen = useDeferredValue(open);

  const menuRef = useRef<HTMLDivElement>(null);

  const optionHandler = useCallback(
    (value: string) => {
      onChange(value);
      setOpen(false);
    },
    [onChange],
  );

  useClickAway(menuRef, () => setOpen(false));

  return {
    ...rest,
    menuRef,
    open,
    defferedOpen,
    selected,
    options,
    optionHandler,
    setOpen: () => setOpen(true),
    triggerTitle: getTitle(selected, options),
  };
};
