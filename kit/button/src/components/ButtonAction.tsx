import React, { FC, CSSProperties } from 'react';
import styled from 'styled-components';

import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import type { ButtonActionProps } from './interfaces';

interface IButtonStyled {
  active: boolean;
  danger: boolean;
  isLeftIcon: boolean;
  isRightIcon: boolean;
  height?: CSSProperties['height'];
}

const ButtonActionStyled = styled.button<IButtonStyled>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: ${({ height }) => `${height}px`};
  padding: 0 8px;
  background: transparent;
  border-radius: 16px;
  z-index: 20;
  transition: 0.08s linear;

  color: ${({ theme }) => theme.white};

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

export const ButtonAction: FC<ButtonActionProps> = ({
  title,
  LeftIcon,
  RightIcon,
  active = false,
  danger = false,
  type = 'button',
  height = 40,
  ...rest
}) => {
  return (
    <ButtonActionStyled
      {...rest}
      data-action-button
      isLeftIcon={!!LeftIcon}
      isRightIcon={!!RightIcon}
      active={active}
      danger={danger}
      type={type}
      height={height}
    >
      <Shape borderRadius={12} />

      {LeftIcon && <LeftIcon />}

      {title && (
        <Typography type='RoundedBold14' className='btn_title'>
          {title}
        </Typography>
      )}

      {RightIcon && <RightIcon />}
    </ButtonActionStyled>
  );
};
