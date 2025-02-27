import React, { FC } from 'react';
import { Typography } from '@launch-ui/typography';
import { ButtonGhost } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';

import { useSelectProps } from './useSelectProps';
import { SelectStyled } from './select.styled';
import type { SelectProps } from './interfaces';

export const Select: FC<SelectProps> = (props) => {
  const {
    menuRef,
    open,
    defferedOpen,
    optionHeight = 56,
    selected,
    options,
    shevronIcon,
    optionHandler,
    setOpen,
    triggerTitle,
  } = useSelectProps(props);

  return (
    <SelectStyled open={open} bodyHeight={options.length * optionHeight}>
      <button className='dropdown-title' aria-hidden={!open} type='button' onClick={defferedOpen ? undefined : setOpen}>
        <Corners borderRadius={20} stroke={1} />

        <Typography type='RoundedBold14' className='dropdown-title-text'>
          {triggerTitle || ''}
        </Typography>

        {shevronIcon}
      </button>

      <div className='dropdown-body' ref={menuRef}>
        <Corners borderRadius={20} stroke={1} />

        {defferedOpen &&
          options
            .sort((a) => (a.value === selected ? -1 : 0))
            .map((option) => (
              <div className='dropdown-body-option' key={option.value}>
                <ButtonGhost
                  title={option.title}
                  onClick={() => optionHandler(option.value)}
                  active={selected === option.value}
                />
              </div>
            ))}
      </div>
    </SelectStyled>
  );
};
