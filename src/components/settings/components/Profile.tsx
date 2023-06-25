import React, { FC, Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { Typography } from '../../typography';

import type { IProfileActions, ISettingsState } from '../reducer';

const animation = keyframes`${fadeIn}`;
const ProfileStyled = styled.div`
  width: 100%;
  min-height: 320px;
  animation: ${animation} 0.2s linear;
`;

interface IProfile {
  values: ISettingsState['profile'];
  setters: IProfileActions;
  dispatch: Dispatch<AnyAction>;
}

export const Profile: FC<IProfile> = () => {
  // const { values, setters, dispatch } = props;

  return (
    <ProfileStyled>
      <Typography type='TextRegular14'>Profile editing is not available yet</Typography>
    </ProfileStyled>
  );
};
