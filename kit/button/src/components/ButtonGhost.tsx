import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Typography } from '@launch-ui/typography';

import type { ButtonGhostProps } from './interfaces';

interface IButtonStyled {
  active: boolean;
  danger: boolean;
}

const ButtonGhostStyled = styled.button<IButtonStyled>`
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

export const ButtonGhost = forwardRef<HTMLButtonElement, ButtonGhostProps>((props, ref) => {
  const {
    title,
    LeftIcon,
    RightIcon,
    active = false,
    danger = false,
    colorPreset = 'primary-colors',
    type = 'button',
    ...rest
  } = props;

  return (
    <ButtonGhostStyled {...rest} ref={ref} type={type} active={active} danger={danger}>
      {!!LeftIcon && <LeftIcon />}

      {title && (
        <Typography type='RoundedBold14' className={`${colorPreset} common-title`}>
          {title}
        </Typography>
      )}

      {!!RightIcon && <RightIcon />}
    </ButtonGhostStyled>
  );
});

ButtonGhost.displayName = 'BtnGhost';
