import React, { FC } from 'react';
import styled from 'styled-components';

import { Shape } from '../../shape/Shape';
import { Typography } from '../../typography/Typography';

import { icons } from '../assets/icons';
import type { Button } from './interfaces';

interface IButtonStyled {
  active: boolean;
  isColorsStatic: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  padding: 0 32px;
  background: transparent;
  border-radius: 22px;
  z-index: 20;
  transition: 0.08s ease-in-out;
  box-shadow: ${({ active, theme }) => {
    switch (true) {
      case active:
        return theme.shadows.largeCtaButton;
      default:
        return 'none';
    }
  }};

  .svg_icon {
    width: 1rem;
    width: 1rem;
    margin-right: 0.75rem;
  }

  .ctabutton-title {
    color: ${({ active, theme }) => (active ? theme.white : theme.texts.title.base)};
    transition: 0.08s ease-in-out;
    user-select: none;
    white-space: nowrap;
  }

  .rounded-shape {
    fill: ${({ theme, active }) => (active ? theme.primary[500] : theme.shapes.base)};
  }

  &:hover {
    .ctabutton-title {
      color: ${({ theme, active }) => (active ? theme.white : theme.primary[500])};
    }
  }
`;

export const Btn: FC<Button> = ({
  title,
  leftIcon,
  isColorsStatic = true,
  active = false,
  disabled = false,
  type = 'button',
  handler,
}) => {
  return (
    <ButtonStyled isColorsStatic={isColorsStatic} active={active} disabled={disabled} type={type} onClick={handler}>
      <Shape borderRadius={18} />

      {leftIcon && icons[leftIcon]}

      {title && (
        <Typography type='RoundedBold14' className='ctabutton-title'>
          {title}
        </Typography>
      )}
    </ButtonStyled>
  );
};
