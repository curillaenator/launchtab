import React, { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { useAppSelector } from '@src/hooks/hooks';
import { Typography } from '@src/components/typography';
import { Corners } from '@src/components/shape';

import { CardImage } from './CardImage';

import type { IBookmark } from '@src/types';

const animation = keyframes`${fadeIn}`;

interface ICardStyled {
  isOpaque: boolean;
  isDeleted?: boolean;
  noAnimation: boolean;
  hasBorder?: boolean;
}

const CardStyled = styled.a<ICardStyled>`
  --card-animation-time: 150ms;
  --card-animation-method: ease-in-out;
  --card-bdrs: calc((18px * 1.25) + 3px);

  --shp-bgc: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base40 : theme.backgrounds.base)};

  will-change: filter;
  overflow: visible;
  backdrop-filter: ${({ isOpaque }) => (isOpaque ? 'blur(8px)' : 'none')};
  background-color: var(--shp-bgc);
  position: relative;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  border-radius: var(--card-bdrs);

  border: 2px solid ${({ theme, hasBorder }) => (hasBorder ? theme.backgrounds.lightest : 'none')};
  opacity: ${({ isDeleted }) => (isDeleted ? 0 : 1)};

  animation: var(--card-animation-time) ${({ noAnimation }) => (noAnimation ? 'none' : animation)};
  transition: var(--card-animation-time) var(--card-animation-method);

  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    color: ${({ theme, isOpaque }) => (isOpaque ? theme.white : theme.texts.base)};
    border-radius: 0 0 20px 20px;
    overflow: hidden;
  }

  &:hover {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};

    transform: scale(1.02);
    background-color: ${({ theme }) => theme.backgrounds.base};

    filter: drop-shadow(${({ theme }) => theme.shadows.card});

    .card-title {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  &:active {
    /* box-shadow: none; */
    transform: scale(1);
    /* background-color: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base20 : theme.backgrounds.base)}; */
  }
`;

interface CardProps {
  bookmark: IBookmark;
  className?: string;
  as?: 'a' | 'div';
  hasBorder?: boolean;
}

export const Card: FC<CardProps> = (props) => {
  const { bookmark, className = 'class-bookmark', as = 'a' } = props;

  const wallpapper = useAppSelector((state) => state.settings.lookfeel.wallpaper);

  const [noAnimation, setNoAnimation] = useState(false);

  return (
    <CardStyled
      isDeleted={bookmark.deleted}
      isOpaque={!!wallpapper}
      noAnimation={noAnimation}
      href={`https://${bookmark.link}`}
      as={as}
      draggable={false}
      className={className}
      // hasBorder={hasBorder}
      onMouseDown={() => setNoAnimation(true)}
      onClick={() => setNoAnimation(true)}
      data-card='true'
    >
      <Corners
        borderRadius={18}
        // className={`card-shape ${hasBorder ? 'card-shape-bordered' : ''}`}
      />

      <CardImage {...bookmark} />

      <Typography type='RoundedBold14' className='card-title'>
        {bookmark.name}
      </Typography>
    </CardStyled>
  );
};
