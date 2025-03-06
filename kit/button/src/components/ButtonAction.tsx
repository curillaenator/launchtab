import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import type { ButtonActionProps } from './interfaces';

const BORDER_RADIUS = 14;

const APPEARANCES = {
  primary: ({ active }: ButtonActionProps) => css`
    --button-text-c: ${({ theme }) => theme.white};
    --button-text-c-h: ${({ theme }) => theme.white};
    --button-text-c-a: ${({ theme }) => theme.white};

    --button-shp-bgc: ${({ theme }) => (active ? theme.primary[700] : theme.primary[500])};
    --button-shp-bgc-h: ${({ theme }) => (active ? theme.primary[700] : theme.primary[300])};
    --button-shp-bgc-a: ${({ theme }) => (active ? theme.primary[700] : theme.primary[700])};

    --button-filter: contrast(1.3) drop-shadow(${({ theme }) => theme.shadows.primary});
  `,

  secondary: ({ active }: ButtonActionProps) => css`
    --button-text-c: ${({ theme }) => (active ? theme.white : theme.texts.base)};
    --button-text-c-h: ${({ theme }) => (active ? theme.white : theme.primary[300])};
    --button-text-c-a: ${({ theme }) => (active ? theme.white : theme.primary[700])};

    --button-shp-bgc: ${({ theme }) => (active ? theme.primary[700] : theme.backgrounds.light)};
    --button-shp-bgc-h: ${({ theme }) => (active ? theme.primary[700] : theme.backgrounds.light)};
    --button-shp-bgc-a: ${({ theme }) => (active ? theme.primary[700] : theme.accent[100])};

    --button-filter: none;
  `,

  disabled: () => css`
    --button-text-c: ${({ theme }) => theme.texts.disabled};
    --button-text-c-h: ${({ theme }) => theme.texts.disabled};
    --button-text-c-a: ${({ theme }) => theme.texts.disabled};

    --button-shp-bgc: ${({ theme }) => theme.backgrounds.light};
    --button-shp-bgc-h: ${({ theme }) => theme.backgrounds.light};
    --button-shp-bgc-a: ${({ theme }) => theme.backgrounds.light};

    --button-filter: none;
  `,
} as const;

const ButtonActionStyled = styled.button<ButtonActionProps>`
  &:not(:disabled) {
    ${(styledProps) => APPEARANCES[styledProps.appearance || 'primary'](styledProps)};
  }

  &:disabled {
    cursor: default;

    ${APPEARANCES.disabled}
  }

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: ${({ fullwidth }) => (fullwidth ? '1 1 auto' : '0 0 auto')};

  gap: 8px;
  height: ${({ height }) => `${height}px`};
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'fit-content')};
  padding: 0 12px;
  background: transparent;
  border-radius: calc(${BORDER_RADIUS}px * 1.25 + 3px);
  z-index: 20;

  will-change: color;
  color: var(--button-text-c);

  & > svg {
    flex: 0 0 auto;
  }

  .btn_title {
    display: block;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rounded-shape {
    will-change: fill;
    fill: var(--button-shp-bgc);
    filter: var(--button-filter);
  }

  &:hover {
    color: var(--button-text-c-h);

    .rounded-shape {
      fill: var(--button-shp-bgc-h);
    }
  }

  &:active {
    color: var(--button-text-c-a);

    .rounded-shape {
      fill: var(--button-shp-bgc-a);
    }
  }
`;

export const ButtonAction = forwardRef<HTMLButtonElement, ButtonActionProps>((props, ref) => {
  const {
    title,
    LeftIcon,
    RightIcon,

    appearance = 'primary',

    fullwidth = false,
    active = false,
    // danger = false,
    type = 'button',
    height = 40,
    ...rest
  } = props;

  return (
    <ButtonActionStyled
      {...rest}
      ref={ref}
      data-action-button
      appearance={appearance}
      active={active}
      fullwidth={fullwidth}
      type={type}
      height={height}
    >
      <Shape borderRadius={BORDER_RADIUS} />

      {LeftIcon && <LeftIcon />}

      {title && (
        <Typography type='RoundedBold14' className='btn_title'>
          {title}
        </Typography>
      )}

      {RightIcon && <RightIcon />}
    </ButtonActionStyled>
  );
});
