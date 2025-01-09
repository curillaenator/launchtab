import React, { FC, useReducer, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { Corners } from '@launch-ui/shape';

import { logout } from '@src/entities/user';
import { $settingsStore, setSettings } from '@src/entities/settings';
import { $pexelsStore, setPexels } from '@src/entities/pexels';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Scrollbars } from '@src/components/scrollbars/Scrollbars';
import { LookFeel } from './components';
import { SettingsStyled } from './styles';

import SaveIcon from '@src/assets/svg/save.svg';
import LogoutIcon from '@src/assets/svg/logout.svg';

export interface ISettings {
  closeSettings: () => void;
}

export const Settings: FC<ISettings> = ({ closeSettings }) => {
  // const lookfeel = useEffectorUnit($settingsStore);
  // const pexels = useEffectorUnit($pexelsStore);

  // useEffect(() => dispatch(r.LookFeelActions.setInitialState(userSettings)), [userSettings]);

  const submitSettings = () => {
    // appDispatch(updateSettings({ lookfeel }));
    closeSettings();
  };

  const hadleLogOut = () => {
    logout();
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
            <LookFeel />
          </Scrollbars>
        </div>

        <div className='form-block'>
          <div className='form-buttons'>
            <ButtonGhost LeftIcon={LogoutIcon} title='Log Out' onClick={hadleLogOut} />
            <ButtonAction LeftIcon={SaveIcon} title='Save changes' onClick={submitSettings} />
          </div>
        </div>
      </div>
    </SettingsStyled>
  );
};
