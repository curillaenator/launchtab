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

import { SettingsStyled } from './styles';

import LogoutIcon from '@src/assets/svg/logout.svg';
import SaveIcon from '@src/assets/svg/save.svg';

export const Settings: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const settings = useEffectorUnit($settingsStore);

  if (!uid) return null;

  return (
    <SettingsStyled>
      <div className='form'>
        <Corners borderRadius={24} corners={['tl', 'bl']} />

        <div className='form-block form-topBlock'>
          <div className='form-title'>
            <Typography type='RoundedHeavy36' className='form-title-themed'>
              Settings
            </Typography>
          </div>

          <Scrollbars height='calc(100vh - 219px)'>
            <LookFeel />
          </Scrollbars>
        </div>

        <div className='form-block'>
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
      </div>
    </SettingsStyled>
  );
};
