import React, { FC } from 'react';
import styled from 'styled-components';

import { Shape, Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

interface ISwitchStyled {
  active: boolean;
}

const SwitchStyled = styled.button<ISwitchStyled>`
  position: relative;
  width: 108px;
  height: 40px;
  background-color: transparent;
  z-index: 100;

  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.backgrounds.light};
  border-radius: calc(14px * 1.25 + 3px);

  svg[data-svg-corner='true'] {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: ${({ theme }) => theme.backgrounds.light};
  }

  .switch-toggler {
    will-change: filter;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 40px;
    z-index: 50;
    background-color: transparent;
    border-radius: calc(14px * 1.25 + 3px);
    transition: 0.12s ease-in-out;
    transform: ${({ active }) => (active ? 'translateX(100%)' : 'translateX(0)')};
    filter: drop-shadow(${({ theme, active }) => (active ? theme.shadows.primary : 'none')});

    &-shape {
      fill: ${({ theme, active }) => (active ? theme.primary[500] : theme.backgrounds.light)};
    }

    &-title {
      transition: 0.08s linear;
      color: ${({ theme, active }) => (active ? theme.white : theme.texts.base)};
    }
  }

  &:hover {
    .switch-toggler {
      &-shape {
        fill: ${({ theme, active }) => (active ? theme.primary[400] : theme.backgrounds.light)};
      }

      &-title {
        color: ${({ theme, active }) => (active ? theme.white : theme.primary[400])};
      }
    }
  }
`;

export interface ITextInput {
  value: boolean;
  onChange: (value: boolean) => void;
  captions?: { checked: string; unchecked: string };
}

export const Switch: FC<ITextInput> = (props) => {
  const { value, captions = { checked: 'On', unchecked: 'Off' }, onChange } = props;
  const { checked: checkedVal, unchecked: uncheckedVal } = captions;

  return (
    <SwitchStyled
      contentEditable={false}
      active={value}
      type='button'
      onClick={() => onChange(!value)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Corners borderRadius={14} stroke={2} />

      <div className='switch-toggler'>
        <Shape className='switch-toggler-shape' borderRadius={20} />

        <Typography type='RoundedBold14' className='switch-toggler-title'>
          {value ? checkedVal : uncheckedVal}
        </Typography>
      </div>
    </SwitchStyled>
  );
};
