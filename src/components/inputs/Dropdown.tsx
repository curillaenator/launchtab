import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Typography } from '../typography/Typography';
import { BtnGhost } from '../buttons';

import { icons } from '../../assets/icons';

interface IDropdownStyled {
  open: boolean;
  bodyHeight: number;
}

const DropdownStyled = styled.div<IDropdownStyled>`
  cursor: pointer;
  width: fit-content;
  position: relative;

  .dropdown-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 220px;
    height: 56px;
    padding: 0 1.5rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.borderLines};
    background-color: ${({ theme }) => theme.shapes.base};
    z-index: 100;

    &-text {
      color: ${({ theme }) => theme.texts.button.base};
      user-select: none;
      transition: 0.08s linear;
    }

    &-shevron {
      transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0)')};
      transition: 0.08s linear;
      fill: ${({ theme, open }) => (open ? theme.primary[500] : theme.texts.button.base)};
    }

    &:hover {
      .dropdown-title-text {
        color: ${({ theme }) => theme.texts.button.hover};
      }

      .dropdown-title-shevron {
        fill: ${({ theme, open }) => (open ? theme.primary[500] : theme.texts.button.hover)};
      }
    }
  }

  .dropdown-body {
    position: absolute;
    top: 0;
    left: 0;
    width: 164px;
    height: ${({ open, bodyHeight }) => (open ? bodyHeight : 0)}px;
    overflow: hidden;
    transition: 0.12s ease-in-out;
    border-radius: 1rem 0 1rem 1rem;
    background-color: ${({ theme }) => theme.shapes.base};
    box-shadow: ${({ theme }) => theme.shadows.basic};
    opacity: ${({ open }) => (open ? 1 : 0)};
    z-index: 9999;

    &-option {
      display: flex;
      align-items: center;
      width: 164px;
      height: 56px;
      padding-left: 0.5rem;
      background-color: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.borderLines};
    }
  }
`;

interface IDropdown {
  optionHeight?: number;
  selected: string;
  options: { title: string; value: string }[];
  onChange: (value: string) => void;
}

export const Dropdown: FC<IDropdown> = ({ optionHeight = 56, selected, options, onChange }) => {
  const [open, setOpen] = useState(false);

  const getTitle = () => options.find((opt) => opt.value === selected)?.title;

  const optionHandler = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <DropdownStyled open={open} bodyHeight={options.length * optionHeight}>
      <button className='dropdown-title' type='button' onClick={() => setOpen((o) => !o)}>
        <Typography type='RoundedBold14' className='dropdown-title-text'>
          {getTitle() as string}
        </Typography>

        {icons.dropdownShevron}
      </button>

      <div className='dropdown-body'>
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
