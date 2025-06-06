import React, { FC } from 'react';

import { Typography } from '@launch-ui/typography';
import { Corners, BDRS } from '@launch-ui/shape';

import { getValidatedHref } from './utils';

import { CardStyled } from './card.styled';
import { CardImage } from './CardImage';
import type { CardProps } from './interfaces';

const BookmarkCard: FC<CardProps> = (props) => {
  const { bookmark, disabled = false } = props;

  return (
    <CardStyled
      data-dookmark-card='true'
      to={getValidatedHref(bookmark.link)}
      draggable={false}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <Corners borderRadius={BDRS[32]} stroke={6} />

      <CardImage {...bookmark} />

      <Typography as='span' type='RoundedBold14' className='card-title'>
        {bookmark.name}
      </Typography>
    </CardStyled>
  );
};

export { BookmarkCard };
