import React, { FC } from 'react';
import styled from 'styled-components';

import { Shape } from '../shape/Shape';
import { Typography } from '../typography';

interface ISwitchStyled {
  active: boolean;
}

const SwitchStyled = styled.button<ISwitchStyled>`
  position: relative;
  width: 108px;
  height: 40px;
  background-color: transparent;
  z-index: 100;

  .switch-shape {
    fill: ${({ theme }) => theme.backgrounds.base};
    stroke-width: 1px;
    stroke: ${({ theme }) => theme.backgrounds.light};
  }

  .switch-toggler {
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
    border-radius: 20px;
    box-shadow: ${({ theme, active }) => (active ? theme.shadows.mediumCtaButton : 'none')};
    transition: 0.12s ease-in-out;
    transform: ${({ active }) => (active ? 'translateX(100%)' : 'translateX(0)')};

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
}

export const Switch: FC<ITextInput> = ({ value, onChange }) => {
  return (
    <SwitchStyled active={value} type='button' onClick={() => onChange(!value)}>
      <Shape className='switch-shape' borderRadius={16} />

      <div className='switch-toggler'>
        <Shape className='switch-toggler-shape' borderRadius={16} />

        <Typography type='RoundedBold14' className='switch-toggler-title'>
          {value ? 'On' : 'Off'}
        </Typography>
      </div>
    </SwitchStyled>
  );
};
