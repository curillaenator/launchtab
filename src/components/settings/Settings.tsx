import React, { FC, useReducer, useEffect } from 'react';
import { Corners } from '@launch-ui/shape';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@src/hooks';

import { updateSettings } from '@src/redux/reducers/settings';
import { logOut } from '@src/redux/reducers/auth';

import { BtnCta, BtnGhost } from '@src/components/buttons';
import { Typography } from '@src/components/typography';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { LookFeel } from './components';

import * as r from './reducer';

const SettingsStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;

  .form {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: transparent;
    --form-bdrs: calc(24px * 1.25 + 3px);

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    height: 100%;
    padding: 32px 0;
    border-radius: var(--form-bdrs) 0 0 var(--form-bdrs);
    background-color: ${({ theme }) => theme.backgrounds.base};

    &-block {
      width: 100%;
      padding: 0 32px;
    }

    &-topBlock {
      height: 100%;
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 40px;

      &-themed {
        color: ${({ theme }) => theme.primary[500]};
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export interface ISettings {
  closeSettings: () => void;
}

export const Settings: FC<ISettings> = ({ closeSettings }) => {
  const appDispatch = useAppDispatch();
  const userSettings = useAppSelector((state) => state.settings);

  const [state, dispatch] = useReducer(r.reducer, r.initialState);
  const { lookfeel, profile, other } = state;

  useEffect(() => dispatch(r.setInitialState(userSettings)), [userSettings]);

  const submitSettings = () => {
    const settings = {
      lookfeel,
      profile,
      other,
    };

    appDispatch(updateSettings(settings));

    closeSettings();
  };

  const hadleLogOut = () => {
    appDispatch(logOut());

    closeSettings();
  };

  return (
    <SettingsStyled>
      <div className='form'>
        <Corners borderRadius={24} corners={['tl', 'bl']} />

        <div className='form-block form-topBlock'>
          <div className='form-title'>
            <Typography type='RoundedHeavy36'>Appearance</Typography>
            <Typography type='RoundedHeavy36' className='form-title-themed'>
              settings
            </Typography>
          </div>

          <Scrollbars height='calc(100vh - 219px)'>
            <LookFeel values={lookfeel} setters={r.LookFeelActions} dispatch={dispatch} />
          </Scrollbars>
        </div>

        <div className='form-block'>
          <div className='form-buttons'>
            <BtnGhost title='Log Out' handler={hadleLogOut} />
            <BtnCta title='Save changes' handler={submitSettings} />
          </div>
        </div>
      </div>
    </SettingsStyled>
  );
};
