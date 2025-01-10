import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '@launch-ui/typography';

const NotesStyled = styled.main`
  width: 100%;
  padding: 56px;
  padding-top: 96px;
`;

export const Notes: FC = () => {
  return (
    <NotesStyled>
      <Typography type='RoundedHeavy36'>Notes</Typography>
    </NotesStyled>
  );
};
