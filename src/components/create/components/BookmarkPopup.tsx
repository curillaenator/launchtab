import React, { FC } from 'react';
import styled from 'styled-components';

import { useCreateBookmark } from '../hooks/useCreateBookmark';

import { TextInput } from '@src/components/inputs/TextInput';
import { BtnCta, BtnGhost, BtnIcon } from '@src/components/buttons';
import { Accordion } from '@src/components/accordion/Accordion';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { Card } from '@src/components/card/Card';
import { Shape } from '@src/components/shape/Shape';
import { Typography } from '@src/components/typography';

import { checkImageURL } from '@src/helpers/helpers';

import type { States, Handlers } from '../hooks/useCreateForm';

const BookmarkPopupStyled = styled.div`
  position: relative;
  width: 458px;
  padding: 32px;
  border-radius: 20px;
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.basic};

  .popup-shape {
    fill: ${({ theme }) => theme.backgrounds.base};
    z-index: 0;
  }

  .popup-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.texts.title.base};

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
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .popup-icons {
    width: 100%;
    margin-bottom: 2rem;

    &-title {
      width: 100%;
      text-align: center;
      color: ${({ theme }) => theme.texts.body.paragraph};
      user-select: none;
      margin-bottom: 1rem;
    }

    &-loader {
      width: 100%;
      height: 80px;
    }

    &-array {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
    }
  }

  .popup-preview {
    padding: 0 35px;
    margin-bottom: 2rem;
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

export const BookmarkPopup: FC<IBookmarkPopup> = ({ values, handlers, handleCreate, close }) => {
  const [iconsWithGoodLinks, iconisFetchedIconsOpenOpen, setIsFetchedIconsOpen, fetchIcons] = useCreateBookmark(
    values.name,
  );

  const bookmark = {
    name: values.name || 'Title',
    link: values.link,
    imageURL: values.imageURL,
    iconURL: values.iconURL,
  };

  const handleIconsSelect = (iconURL: string) => {
    handlers.handleIconURL(iconURL);
    handlers.handleImageURL('');
  };

  const handleImagePasteURL = (imageURL: string) => {
    checkImageURL(imageURL).then((response) => {
      handlers.handleImageURL(imageURL);
      handlers.handleIconURL('');

      if (response.ok) return handlers.handleImageURLerror(false);
      if (!response.ok) return handlers.handleImageURLerror(true);
    });
  };

  return (
    <BookmarkPopupStyled>
      <Shape borderRadius={18} isAdaptive className='popup-shape' />

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

        <TextInput
          type='url'
          iconName='image'
          name='new-image'
          value={values.imageURL}
          onChange={handleImagePasteURL}
          placeholder='Paste here image link'
          // error={values.imageURLerror}
        />
      </div>

      <div className='popup-icons'>
        <Accordion
          title={iconisFetchedIconsOpenOpen ? 'hide icons' : '...or select from icons'}
          disabled={iconsWithGoodLinks.length === 0}
          open={iconisFetchedIconsOpenOpen}
          openHandler={() => setIsFetchedIconsOpen((open) => !open)}
        >
          <Scrollbars height={172}>
            <div className='popup-icons-array'>
              {iconsWithGoodLinks.map((icon) => {
                return <BtnIcon key={icon.url} imageURL={icon.url} imageHandler={handleIconsSelect} />;
              })}
            </div>
          </Scrollbars>
        </Accordion>
      </div>

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
