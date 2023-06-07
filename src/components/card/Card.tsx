import React, { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { useAppSelector } from '@src/hooks/hooks';
import { Typography } from '@src/components/typography';
import { Shape } from '@src/components/shape/Shape';

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
  --card-animation-time: 120ms;
  --card-animation-method: ease-in-out;

  position: relative;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  border-radius: 20px;
  /* overflow: hidden; */
  will-change: transform;
  backdrop-filter: blur(5px);
  opacity: ${({ isDeleted }) => (isDeleted ? 0 : 1)};
  border: 2px solid ${({ theme, hasBorder }) => (hasBorder ? theme.backgrounds.lightest : 'none')};

  animation: var(--card-animation-time) ${({ noAnimation }) => (noAnimation ? 'none' : animation)};

  transition: var(--card-animation-time) var(--card-animation-method);

  .card-shape {
    fill: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base40 : theme.backgrounds.base)};
    backdrop-filter: ${({ isOpaque }) => (isOpaque ? 'blur(5px)' : 'none')};

    &-bordered {
      stroke: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base40 : theme.backgrounds.lightest)};
      stroke-width: 1px;
    }
  }

  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    color: ${({ theme, isOpaque }) => (isOpaque ? theme.white : theme.texts.base)};
  }

  &:hover {
    /* box-shadow: ${({ theme }) => theme.shadows.basic}; */
    transform: scale(1.02);
    background-color: ${({ theme }) => theme.backgrounds.base};

    .card-shape {
      filter: drop-shadow(${({ theme }) => theme.shadows.card2});
    }

    .card-title {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  &:active {
    box-shadow: none;
    transform: scale(1);
    background-color: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base20 : theme.backgrounds.base)};
  }
`;

interface CardProps {
  bookmark: IBookmark;
  className?: string;
  as?: 'a' | 'div';
  hasBorder?: boolean;
}

export const Card: FC<CardProps> = (props) => {
  const { bookmark, className = 'class-bookmark', as = 'a', hasBorder = false } = props;

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
    >
      <Shape borderRadius={18} className={`card-shape ${hasBorder ? 'card-shape-bordered' : ''}`} />

      <CardImage {...bookmark} />

      <Typography type='RoundedBold14' className='card-title'>
        {bookmark.name}
      </Typography>
    </CardStyled>
  );
};
