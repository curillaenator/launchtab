import React, { FC } from 'react';
import styled from 'styled-components';

import { icons } from '@src/assets/icons';
import { pagesIcons } from '@src/assets/pagesIcons';

import type { IBookmark } from '@src/types';

const CardImageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  border-radius: var(--card-bdrs) var(--card-bdrs) 0px 0px;
  overflow: hidden;
  padding: 4px 4px 0 4px;

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    border-radius: 0 0 6px 6px;
  }

  .card-icon {
    width: 88px;
    height: 88px;
    user-select: none;

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
