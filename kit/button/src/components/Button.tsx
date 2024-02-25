import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import type { BaseButtonProps } from './interfaces';

export const ButtonStyled = styled.button<BaseButtonProps>`
  --shp-bgc: ${({ theme, active }) => (active ? theme.primary[500] : theme.backgrounds.base)};
  --shp-bdc: transparent;

  will-change: filter;
  position: relative;
  display: flex;
  gap: 0;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 0 16px;

  background-color: var(--shp-bgc);
  border-radius: calc(20px * 1.25 + 3px);

  color: ${({ active, theme }) => (active ? theme.white : theme.texts.base)};

  filter: ${({ active }) => (active ? 'contrast(1.3)' : 'contrast(1)')}
    drop-shadow(
      ${({ active, theme }) => {
        switch (true) {
          case active:
            return theme.shadows.primary;
          default:
            return 'none';
        }
      }}
    );

  .title {
    user-select: none;
    white-space: nowrap;
    padding: 0 8px;
  }

  &:hover {
    color: ${({ theme, active }) => (active ? theme.white : theme.primary[500])};
  }
`;

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { title, IconLeft, IconRight, ...rest } = props;

  return (
    <ButtonStyled {...rest} ref={ref}>
      <Corners borderRadius={20} />

      {IconLeft && <IconLeft />}

      {title && (
        <Typography as='span' type='RoundedBold14' className='title'>
          {title}
        </Typography>
      )}

      {IconRight && <IconLeft />}
    </ButtonStyled>
  );
});

Button.displayName = 'Button';
