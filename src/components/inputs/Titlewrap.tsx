import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Typography, ITypographyTypes } from '../typography';

const TitlewrapStyled = styled.div`
  .titlewrap-title {
    margin-bottom: 16px;
  }

  .titlewrap-children {
    padding-left: 16px;
  }
`;

interface ITitlewrap extends PropsWithChildren {
  title: string;
  titleType?: ITypographyTypes;
  className?: string;
}

export const Titlewrap: FC<ITitlewrap> = ({ title, titleType = 'RoundedBold20', children, className }) => {
  return (
    <TitlewrapStyled className={className || 'titlewrap'}>
      <Typography type={titleType} className='titlewrap-title'>
        {title}
      </Typography>

      <div className='titlewrap-children'>{children}</div>
    </TitlewrapStyled>
  );
};
