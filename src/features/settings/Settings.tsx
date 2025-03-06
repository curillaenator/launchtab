import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { Corners } from '@launch-ui/shape';
import { logout } from '@src/entities/user';

import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { LookFeel } from './components';

import { setRightDrawer } from '@src/entities/app';
import { $userStore } from '@src/entities/user';
import { $settingsStore, saveSettingsQuery } from '@src/entities/settings';

import { SettingsStyled } from './settings.styled';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import LogoutIcon from '@src/assets/svg/logout.svg';
import SaveIcon from '@src/assets/svg/save.svg';

export const Settings: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const settings = useEffectorUnit($settingsStore);

  if (!uid) return null;

  return (
    <SettingsStyled>
      <div className='form'>
        <Corners borderRadius={LAUNCH_PAPER_BDRS} corners={['tl', 'bl']} />

        <div className='form-title'>
          <Typography as='h2' type='RoundedHeavy36' className='form-title-themed'>
            Settings
          </Typography>
        </div>

        <div className='form-body'>
          <Scrollbars height='calc(100vh - 96px - 88px - 2px)'>
            <LookFeel />
          </Scrollbars>
        </div>

        <div className='form-buttons'>
          <ButtonGhost
            LeftIcon={() => <LogoutIcon />}
            title='Log Out'
            onClick={() => {
              logout();
              setRightDrawer(false);
            }}
          />

          <ButtonAction
            LeftIcon={() => <SaveIcon />}
            title='Save settings'
            onClick={() => {
              saveSettingsQuery({ uid, settings });
              setRightDrawer(false);
            }}
          />
        </div>
      </div>
    </SettingsStyled>
  );
};
