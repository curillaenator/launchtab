import React, { FC } from 'react';

import { Typography } from '@launch-ui/typography';

import { Corners } from '@launch-ui/shape';

import { NoteContainer } from './dashboard.styled';

const NotesDashboard: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  return (
    <NoteContainer height={maxHeight}>
      <Corners borderRadius={24} />

      <Typography as='h2' type='RoundedHeavy36'>
        Notes dashboard
      </Typography>
    </NoteContainer>
  );
};

export { NotesDashboard };
