import React, { FC } from 'react';
import styled from 'styled-components';

import { useCreateBookmark } from '../hooks/useCreateBookmark';

import { TextInput } from '@src/components/inputs/TextInput';
import { BtnCta, BtnGhost, BtnIcon } from '@launch-ui/button';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { Card } from '@src/components/card/Card';
import { Shape } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import type { States, Handlers } from '../hooks/useCreateForm';

const ICONS_IN_A_ROW = 4;

const BookmarkPopupStyled = styled.div`
  position: relative;
  width: calc(80px * ${ICONS_IN_A_ROW} + 8px * (${ICONS_IN_A_ROW} - 1) + 2 * 32px + 16px);
  padding: 32px;
  border-radius: 20px;
  background-color: transparent;

  .popup-shape {
    overflow: visible;
    fill: ${({ theme }) => theme.backgrounds.base};
    filter: drop-shadow(${({ theme }) => theme.shadows.card});
    z-index: 0;
  }

  .popup-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.texts.base};

    & > h3 {
      z-index: 1;
    }

    &-themed {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  .popup-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  .popup-icons {
    width: 100%;
    margin-bottom: 24px;

    &-array {
      display: grid;
      grid-template-columns: repeat(${ICONS_IN_A_ROW}, 1fr);
      width: 100%;
      gap: 8px;
    }
  }

  .popup-preview {
    padding: 0 32px;
    margin-bottom: 24px;
  }

  .popup-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

interface IBookmarkPopup {
  values: States;
  handlers: Handlers;
  handleCreate: (close: () => void) => void;
  close: () => void;
}

export const BookmarkPopup: FC<IBookmarkPopup> = (props) => {
  const { values, handlers, handleCreate, close } = props;

  const { iconsWithGoodLinks, fetchIcons } = useCreateBookmark(values.name);

  const bookmark = {
    name: values.name || 'Title',
    link: values.link,
    imageURL: values.imageURL,
    iconURL: values.iconURL,
  };

  return (
    <BookmarkPopupStyled>
      <Shape borderRadius={24} className='popup-shape' />

      <div className='popup-title'>
        <Typography type='RoundedHeavy24'>New</Typography>

        <Typography type='RoundedHeavy24' className='popup-title-themed'>
          bookmark
        </Typography>
      </div>

      <div className='popup-inputs'>
        <TextInput
          type='text'
          iconName='pencil'
          name='new-bookmark'
          limitSymbols={24}
          value={values.name}
          onChange={handlers.handleName}
          onFocusOut={fetchIcons}
          placeholder='Title'
        />

        <TextInput
          type='url'
          iconName='link'
          name='new-link'
          value={values.link}
          onChange={handlers.handleLink}
          placeholder='Site link'
        />
      </div>

      {!!iconsWithGoodLinks.length && (
        <div className='popup-icons'>
          <Scrollbars height='172px'>
            <div className='popup-icons-array'>
              {iconsWithGoodLinks.map((icon) => (
                <BtnIcon
                  key={icon.url}
                  imageURL={icon.url}
                  imageHandler={(iconURL: string) => handlers.handleIconURL(iconURL)}
                />
              ))}
            </div>
          </Scrollbars>
        </div>
      )}

      <div className='popup-preview'>
        <Card bookmark={bookmark} as='div' hasBorder />
      </div>

      <div className='popup-buttons'>
        <BtnCta title='Create' handler={() => handleCreate(close)} />
        <BtnGhost title='Cancel' handler={() => close()} />
      </div>
    </BookmarkPopupStyled>
  );
};
