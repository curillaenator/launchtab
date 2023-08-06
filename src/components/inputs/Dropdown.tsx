import React, { FC, useState, useRef, useDeferredValue } from 'react';

import { useClickAway } from '@launch-ui/utils';

import { Typography } from '@src/components/typography';
import { BtnGhost } from '@src/components/buttons';

import { icons } from '@src/assets/icons';

import { DropdownStyled } from './dropdown.styled';

interface IDropdown {
  optionHeight?: number;
  selected: string;
  options: { title: string; value: string }[];
  onChange: (value: string) => void;
}

const getTitle = (selected: string, options: IDropdown['options']) => {
  return options.find((opt) => opt.value === selected)?.title;
};

export const Dropdown: FC<IDropdown> = (props) => {
  const { optionHeight = 56, selected, options, onChange } = props;

  const [open, setOpen] = useState(false);
  const defferedOpen = useDeferredValue(open);

  const menuRef = useRef<HTMLDivElement>(null);

  const optionHandler = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  useClickAway(menuRef, () => setOpen(false));

  return (
    <DropdownStyled open={open} bodyHeight={options.length * optionHeight}>
      <button
        className='dropdown-title'
        aria-hidden={!open}
        type='button'
        onClick={defferedOpen ? undefined : () => setOpen(true)}
      >
        <Typography type='RoundedBold14' className='dropdown-title-text'>
          {getTitle(selected, options) as string}
        </Typography>

        {icons.dropdownShevron}
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
    </DropdownStyled>
  );
};
