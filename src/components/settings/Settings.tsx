import React, { FC, useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as r from './reducer';
import { updateSettings } from '../../redux/reducers/settings';
import { logOut } from '../../redux/reducers/auth';

import { BtnCta, BtnGhost } from '../buttons';
import { Typography } from '../typography';
import { Shape } from '../shape/Shape';
import { Scrollbars } from '../scrollbars/Scrollbars';

import { LookFeel, Profile } from './components';

import { LOOKFEEL, PROFILE } from './constants';

const SettingsStyled = styled.div`
  width: 100%;
  border-radius: 32px;
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.basic};

  .form {
    position: relative;
    padding: 56px;
    z-index: 20;

    &-shape {
      fill: ${({ theme }) => theme.background};
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 64px;

      &-themed {
        color: ${({ theme }) => theme.primary[400]};
      }
    }

    &-settings {
      display: flex;
      width: 100%;
      margin-bottom: 2rem;

      &-menu {
        width: 154px;
        flex-shrink: 0;
        margin-left: -16px;
      }

      &-framework {
        width: 100%;
        padding: 0 16px 0 58px;
        border-left: 1px solid ${({ theme }) => theme.borderLines};
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      &-block {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  @media (min-width: 1024px) {
    width: 858px;
  }
`;

interface ISettings {
  closeSettings: () => void;
}

export const Settings: FC<ISettings> = ({ closeSettings }) => {
  const appDispatch = useAppDispatch();
  const userSettings = useAppSelector((state) => state.settings);

  const [state, dispatch] = useReducer(r.reducer, r.initialState);
  const { currentTab, lookfeel, profile, other } = state;

  const TABS = [
    { title: LOOKFEEL, handler: () => dispatch(r.setCurrentTab(LOOKFEEL)) },
    { title: PROFILE, handler: () => dispatch(r.setCurrentTab(PROFILE)) },
    // { title: OTHER, handler: () => dispatch(r.setCurrentTab(OTHER)) },
  ];

  useEffect(() => dispatch(r.setInitialState(userSettings)), []);

  const submitSettings = () => {
    const settings = {
      lookfeel,
      profile,
      other,
    };
    appDispatch(updateSettings(settings));
  };

  const hadleLogOut = () => {
    appDispatch(logOut());
    closeSettings();
  };

  return (
    <SettingsStyled>
      <div className='form'>
        <Shape className='form-shape' borderRadius={24} isAdaptive />

        <div className='form-title'>
          <Typography type='RoundedHeavy36'>Design & profile</Typography>
          <Typography type='RoundedHeavy36' className='form-title-themed'>
            settings
          </Typography>
        </div>

        <div className='form-settings'>
          <div className='form-settings-menu'>
            {TABS.map((tab) => (
              <BtnGhost {...tab} active={currentTab === tab.title} key={tab.title} />
            ))}
          </div>

          <Scrollbars height={320}>
            <div className='form-settings-framework'>
              {currentTab === LOOKFEEL && (
                <LookFeel values={lookfeel} setters={r.LookFeelActions} dispatch={dispatch} />
              )}

              {currentTab === PROFILE && <Profile values={profile} setters={r.ProfileActions} dispatch={dispatch} />}

              {/* {currentTab === OTHER && (
                <Other values={other} dispatch={dispatch} />
              )} */}
            </div>
          </Scrollbars>
        </div>

        <div className='form-buttons'>
          <div className='form-buttons-block'>
            <BtnGhost title='Log Out' handler={hadleLogOut} />
          </div>

          <div className='form-buttons-block'>
            <BtnGhost title='Close' handler={closeSettings} />
            <BtnCta title='Save changes' handler={submitSettings} />
          </div>
        </div>
      </div>
    </SettingsStyled>
  );
};
