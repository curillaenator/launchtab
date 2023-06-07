import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../typography/Typography';
import { Shape } from '../../shape/Shape';

import { icons } from './../assets/icons';
import type { Button } from './interfaces';

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
  box-shadow: ${({ theme }) => theme.shadows.mediumCtaButton};
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
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.mediumCtaButtonHover};

    .rounded-shape {
      filter: contrast(1.64);
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.mediumCtaButtonActive};

    .btn_title {
      opacity: 0.75;
    }

    .rounded-shape {
      fill: ${({ theme }) => theme.primary[600]};
    }
  }
`;

export const BtnCta: FC<Button> = ({
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
