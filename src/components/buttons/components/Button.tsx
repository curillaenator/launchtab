import React, { forwardRef } from 'react';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { ButtonStyled } from './button.styled';
import type { BaseButtonProps } from './interfaces';

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { title, IconLeft, IconRight, isColorsStatic = true, ...rest } = props;

  return (
    <ButtonStyled {...rest} ref={ref} isColorsStatic={isColorsStatic}>
      <Corners borderRadius={20} />

      {IconLeft && <IconLeft />}

      {title && (
        <Typography type='RoundedBold14' className='title'>
          {title}
        </Typography>
      )}

      {IconRight && <IconLeft />}
    </ButtonStyled>
  );
});

Button.displayName = 'Button';
