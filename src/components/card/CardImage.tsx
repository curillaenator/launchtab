import React, { FC } from 'react';
import styled from 'styled-components';

import { icons } from '../../assets/icons';
import { pagesIcons } from '../../assets/pagesIcons';

import type { IBookmark } from '../../types/types';

const CardImageStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 142px;

  .card-image {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    object-fit: cover;
    user-select: none;
    border-radius: 19px 19px 6px 6px;
    margin-top: 2px;
    filter: ${({ theme }) => theme.imageEffects.cardImageDarkMode};
  }

  .card-icon {
    width: 88px;
    height: 88px;
    margin-top: 38px;
    user-select: none;
    filter: ${({ theme }) => theme.imageEffects.cardImageDarkMode};

    .content-svg {
      width: 100%;
      height: 100%;
    }

    .svg-icon {
      width: 100%;
      height: 100%;

      &-light {
        fill: ${({ theme }) => theme.icons.light};
      }

      &-dark {
        fill: ${({ theme }) => theme.icons.dark};
      }
    }
  }
`;

export const CardImage: FC<IBookmark> = ({ name, link, imageURL, iconURL }) => {
  const generatedSitePreview = `https://image.thum.io/get/auth/53623-screenshot/allowJPG/width/640/crop/1200/viewportWidth/1520/noanimate/maxAge/48/https://${link}`;
  const isInBookmarkIcons = link in pagesIcons;

  if (iconURL)
    return (
      <CardImageStyled>
        <img className='card-icon' src={iconURL} alt={name} draggable={false} />
      </CardImageStyled>
    );

  if (imageURL)
    return (
      <CardImageStyled>
        <img className='card-image' src={imageURL} alt={name} draggable={false} />
      </CardImageStyled>
    );

  if (link)
    return (
      <CardImageStyled>
        {isInBookmarkIcons && <div className='card-icon'>{pagesIcons[link]}</div>}

        {!isInBookmarkIcons && <img className='card-image' src={generatedSitePreview} alt={name} draggable={false} />}
      </CardImageStyled>
    );

  return (
    <CardImageStyled>
      <div className='card-icon'>{icons.image}</div>
    </CardImageStyled>
  );
};
