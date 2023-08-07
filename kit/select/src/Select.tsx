import React, { FC } from 'react';
import { Typography } from '@launch-ui/typography';
import { BtnGhost } from '@launch-ui/button';

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
        <Typography type='RoundedBold14' className='dropdown-title-text'>
          {triggerTitle}
        </Typography>

        {shevronIcon}
      </button>

      <div className='dropdown-body' ref={menuRef}>
        {options.map((option) => (
          <div className='dropdown-body-option' key={option.value}>
            <BtnGhost
              title={option.title}
              handler={() => optionHandler(option.value)}
              active={selected === option.value}
            />
          </div>
        ))}
      </div>
    </SelectStyled>
  );
};
