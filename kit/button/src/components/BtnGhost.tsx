import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Typography } from '@launch-ui/typography';

import { icons } from '../assets/icons';
import type { IBtnGhost } from './interfaces';

interface IButtonStyled {
  active: boolean;
  danger: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  background: transparent;
  z-index: 20;

  &:disabled {
    cursor: default !important;
  }

  .svg_icon {
    width: 1rem;
    width: 1rem;
    margin-right: 0.75rem;
  }

  .common-title {
    transition: 0.08s ease-in-out;
    user-select: none;
    white-space: nowrap;
  }

  .primary-colors {
    color: ${({ active, theme, disabled, danger }) => {
      switch (true) {
        case disabled:
          return theme.texts.disabled;
        case danger:
          return theme.texts.error;
        case active:
          return theme.primary[500];
        default:
          return theme.texts.base;
      }
    }};
  }

  .secondary-colors {
    color: ${({ active, theme, disabled, danger }) => {
      switch (true) {
        case disabled:
          return theme.texts.disabled;
        case danger:
          return theme.texts.error;
        case active:
          return theme.primary[500];
        default:
          return theme.secondary[500];
      }
    }};
  }

  &:hover {
    .primary-colors {
      color: ${({ theme, active, disabled, danger }) => {
        switch (true) {
          case disabled:
            return theme.texts.disabled;
          case danger:
            return theme.texts.error;
          case active:
            return theme.primary[500];
          default:
            return theme.primary[400];
        }
      }};
    }

    .secondary-colors {
      color: ${({ active, theme, disabled, danger }) => {
        switch (true) {
          case disabled:
            return theme.backgrounds.base;
          case danger:
            return theme.texts.error;
          case active:
            return theme.secondary[500];
          default:
            return theme.primary[400];
        }
      }};
    }
  }
`;

export const BtnGhost = forwardRef<HTMLButtonElement, IBtnGhost>((props, ref) => {
  const {
    title,
    leftIcon,
    active = false,
    danger = false,
    disabled = false,
    type = 'button',
    colorPreset = 'primary-colors',
    className = 'ghost-button',
    style,
    handler,
  } = props;

  return (
    <ButtonStyled
      ref={ref}
      className={className}
      active={active}
      disabled={disabled}
      danger={danger}
      type={type}
      style={style}
      onClick={handler}
    >
      {!!leftIcon && icons[leftIcon]}

      {title && (
        <Typography type='RoundedBold14' className={`${colorPreset} common-title`}>
          {title}
        </Typography>
      )}
    </ButtonStyled>
  );
});

BtnGhost.displayName = 'BtnGhost';
