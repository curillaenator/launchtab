import React, { FC } from 'react';
import styled from 'styled-components';

// import { RichTextField } from '@launch-ui/richtext';

import { Corners } from '@launch-ui/shape';

import { Typography } from '@launch-ui/typography';

// import { CONTENT } from './constants';

const NotesStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  --form-bdrs: calc(24px * 1.25 + 3px);

  position: relative;

  width: 100%;
  height: fit-content;
  border-radius: var(--form-bdrs);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 56px;
`;

export const Notes: FC = () => {
  return (
    <NotesStyled>
      <Corners borderRadius={24} />

      <Typography type='RoundedHeavy36'>Notes</Typography>

      {/* <RichTextField initialValue={CONTENT} /> */}
    </NotesStyled>
  );
};
