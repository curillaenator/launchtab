import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { Corners } from '@launch-ui/shape';
import { logout } from '@src/entities/user';

import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { LookFeel } from './components';

import { setRightDrawer } from '@src/entities/app';
import { $settingsStore, saveSettings } from '@src/entities/settings';
import { $userStore } from '@src/entities/user';

import { SettingsStyled } from './styles';

//@ts-expect-error
import SaveIcon from '@src/assets/svg/save.svg';
//@ts-expect-error
import LogoutIcon from '@src/assets/svg/logout.svg';

export const Settings: FC = () => {
  const settings = useEffectorUnit($settingsStore);
  const { uid } = useEffectorUnit($userStore);

  console.log('settings', settings);

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
              LeftIcon={LogoutIcon}
              title='Log Out'
              onClick={() => {
                logout();
                setRightDrawer(false);
              }}
            />

            <ButtonAction
              title='Save settings'
              LeftIcon={SaveIcon}
              onClick={() => {
                saveSettings({ uid, settings });
                setRightDrawer(false);
              }}
            />
          </div>
        </div>
      </div>
    </SettingsStyled>
  );
};
