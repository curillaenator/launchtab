import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { CreateFormCTX } from '../context';

import { TextInput } from '@src/components/inputs';
import { BtnCta, BtnGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

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
        handleCreate();
        closePopup();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className='popup'>
        <Shape className='popup-shape' borderRadius={24} />

        <div className='popup-title'>
          <Typography type='RoundedHeavy24'>New</Typography>

          <Typography type='RoundedHeavy24' className='popup-title-themed'>
            page
          </Typography>
        </div>

        <div className='popup-inputs'>
          <TextInput
            type='text'
            iconName='pencil'
            name='new-page'
            placeholder='Title'
            limitSymbols={24}
            value={formState.name}
            onChange={(pageName) => dispatchForm({ key: 'name', payload: pageName })}
          />
        </div>

        <div className='popup-buttons'>
          <BtnCta title='Create' type='submit' />
          <BtnGhost type='button' title='Cancel' handler={() => closePopup()} />
        </div>
      </div>
    </PagePopupStyled>
  );
};
