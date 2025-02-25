import React, { FC } from 'react';

import { Shape, Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { SwitchStyled } from './switch.styled';
import { SwitchProps } from './interfaces';

const Switch: FC<SwitchProps> = (props) => {
  const { checked, captions = { checked: 'On', unchecked: 'Off' }, onChange, onClick, ...rest } = props;
  const { checked: checkedVal, unchecked: uncheckedVal } = captions;

  return (
    <SwitchStyled
      {...rest}
      contentEditable={false}
      checked={checked}
      type='button'
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
        onClick?.(e);
      }}
    >
      <Corners borderRadius={14} stroke={1} />

      <div className='switch-toggler'>
        <Shape className='switch-toggler-shape' borderRadius={18} />

        <Typography type='RoundedBold14' className='switch-toggler-title'>
          {checked ? checkedVal : uncheckedVal}
        </Typography>
      </div>
    </SwitchStyled>
  );
};

export { Switch };
