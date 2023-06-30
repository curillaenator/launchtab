import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../typography/Typography';
import { Shape } from '@launch-ui/shape';

import { icons } from './../assets/icons';
import type { ButtonProps } from './interfaces';

// TODO size variations

interface IButtonStyled {
  active: boolean;
  danger: boolean;
  isLeftIcon: boolean;
  isRightIcon: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding-left: ${({ isLeftIcon }) => (isLeftIcon ? '12px' : '16px')};
  padding-right: ${({ isRightIcon }) => (isRightIcon ? '8px' : '16px')};
  background: transparent;
  border-radius: 16px;
  z-index: 20;
  transition: 0.08s linear;

  .button-icon {
    &-light {
      fill: ${({ theme }) => theme.primary[300]};
    }

    &-dark {
      fill: ${({ theme }) => theme.primary[50]};
    }
  }

  .btn_title {
    transition: 0.08s linear;
    color: ${({ theme }) => theme.white};
    white-space: nowrap;
  }

  .rounded-shape {
    transition: 0.08s linear;
    fill: ${({ theme }) => theme.primary[500]};
    filter: contrast(1.3) drop-shadow(${({ theme }) => theme.shadows.primary});
  }

  &:hover {
    .rounded-shape {
      fill: ${({ theme }) => theme.primary[400]};
    }
  }

  &:active {
    .btn_title {
      opacity: 0.75;
    }

    .rounded-shape {
      fill: ${({ theme }) => theme.primary[600]};
    }
  }
`;

export const BtnCta: FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  active = false,
  disabled = false,
  danger = false,
  type = 'button',
  handler,
}) => {
  return (
    <ButtonStyled
      isLeftIcon={!!leftIcon}
      isRightIcon={!!rightIcon}
      active={active}
      disabled={disabled}
      danger={danger}
      type={type}
      onClick={handler}
    >
      <Shape borderRadius={12} />

      {leftIcon && icons[leftIcon]}

      {title && (
        <Typography type='RoundedBold14' className='btn_title'>
          {title}
        </Typography>
      )}

      {rightIcon && icons[rightIcon]}
    </ButtonStyled>
  );
};
