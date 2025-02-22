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
  background: transparent;
  z-index: 20;

  transition: color 0.08s ease-in-out;
  color: ${({ theme, active }) => (active ? theme.primary[500] : theme.texts.base)};

  &:disabled {
    cursor: default !important;
  }

  .common-title {
    padding: 0 16px;
    user-select: none;
    white-space: nowrap;
  }

  &:hover {
    color: ${({ theme }) => theme.primary[500]};
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
    //@ts-ignore
    <ButtonGhostStyled
      //
      {...rest}
      data-ghost-button
      ref={ref}
      type={type}
      active={active}
      danger={danger}
    >
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
