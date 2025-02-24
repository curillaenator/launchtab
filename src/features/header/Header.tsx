import React, { FC, memo } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { Button } from '@launch-ui/button';

import { $appStore, setAside, setRightDrawer, setSignIn } from '@src/entities/app';
import { $userStore } from '@src/entities/user';
import { $headerStore } from '@src/entities/header';

import { HeaderStyled } from './header.styled';

//@ts-expect-error
import SettingsIcon from '@src/assets/svg/settings.svg';
//@ts-expect-error
import MeatballsIcon from '@src/assets/svg/meatballs.svg';
//@ts-expect-error
import LoginIcon from '@src/assets/svg/login.svg';

export const Header: FC = memo(() => {
  const user = useEffectorUnit($userStore);
  const { isAsideOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { isHeaderShadowed, midComponent: MiddleComponent } = useEffectorUnit($headerStore);

  return (
    <HeaderStyled isHeaderShadowed={isHeaderShadowed}>
      <Button IconLeft={MeatballsIcon} onClick={() => setAside(!isAsideOpen)} />

      {MiddleComponent && <MiddleComponent />}

      <Button
        IconLeft={!!user.uid ? SettingsIcon : LoginIcon}
        onClick={() => {
          if (!!user.uid) {
            setRightDrawer(!isRightDrawerOpen);
          } else {
            setSignIn(true);
          }
        }}
      />
    </HeaderStyled>
  );
});
