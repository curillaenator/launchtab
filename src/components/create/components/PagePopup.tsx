import React, { FC } from 'react';
import styled from 'styled-components';

import { TextInput } from '@src/components/inputs';
import { BtnCta, BtnGhost } from '@src/components/buttons';
import { Typography } from '@src/components/typography/Typography';
import { Shape } from '@src/components/shape/Shape';

const PagePopupStyled = styled.div`
  width: 340px;
  border-radius: 20px;
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.basic};

  .popup {
    position: relative;
    width: 100%;
    padding: 32px;
    z-index: 20;

    &-shape {
      fill: ${({ theme }) => theme.backgrounds.base};
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 24px;
      color: ${({ theme }) => theme.texts.body.paragraph};

      &-themed {
        color: ${({ theme }) => theme.primary[500]};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 32px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
`;

interface IPagePopup {
  pageName: string;
  handlePageName: (knobName: string) => void;
  handleCreate: (close: () => void) => void;
  close: () => void;
}

export const PagePopup: FC<IPagePopup> = ({ pageName, handlePageName, handleCreate, close }) => {
  return (
    <PagePopupStyled>
      <div className='popup'>
        <Shape className='popup-shape' borderRadius={18} />

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
            value={pageName}
            onChange={handlePageName}
          />
        </div>

        <div className='popup-buttons'>
          <BtnCta title='Create' handler={() => handleCreate(close)} />
          <BtnGhost title='Cancel' handler={() => close()} />
        </div>
      </div>
    </PagePopupStyled>
  );
};
