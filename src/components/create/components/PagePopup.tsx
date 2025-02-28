import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { CreateFormCTX } from '../context';

import { Input } from '@launch-ui/input';
import { Shape } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';

import LabelIcon from '@src/assets/svg/lable.svg';

const PagePopupStyled = styled.form`
  width: 336px;
  background-color: transparent;

  .popup {
    position: relative;
    width: 100%;
    padding: 32px;
    z-index: 20;
    will-change: filter;
    overflow: visible;

    &-shape {
      overflow: visible;
      fill: ${({ theme }) => theme.backgrounds.base};
      filter: drop-shadow(${({ theme }) => theme.shadows.card});
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 24px;
      color: ${({ theme }) => theme.texts.base};

      &-themed {
        color: ${({ theme }) => theme.primary[500]};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
`;

export const PagePopup: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const { formState, dispatchForm, handleCreate } = useContext(CreateFormCTX);

  return (
    <PagePopupStyled
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate?.();
        closePopup();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className='popup'>
        <Shape className='popup-shape' borderRadius={24} />

        <div className='popup-title'>
          <Typography as='h2' type='RoundedHeavy24'>
            New
          </Typography>

          <Typography as='h2' type='RoundedHeavy24' className='popup-title-themed'>
            folder
          </Typography>
        </div>

        <div className='popup-inputs'>
          <Input
            type='text'
            icon={() => <LabelIcon />}
            name='new-page'
            placeholder='Title'
            limitSymbols={24}
            value={formState.name}
            onChange={(e) => dispatchForm?.({ key: 'name', payload: e.target.value })}
          />
        </div>

        <div className='popup-buttons'>
          <ButtonAction title='Create' type='submit' />
          <ButtonGhost title='Cancel' type='button' onClick={() => closePopup()} />
        </div>
      </div>
    </PagePopupStyled>
  );
};
