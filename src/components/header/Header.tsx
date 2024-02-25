import React, { FC, useContext, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@launch-ui/button';

import { useAppSelector } from '@src/hooks/hooks';
import { LayoutCTX } from '@src/layout';
import { SearchField } from './components/SearchField';

import SettingsIcon from '@src/assets/svg/settings.svg';
import MeatballsIcon from '@src/assets/svg/meatballs.svg';

const HeaderStyled = styled.header<{ shadowed: boolean }>`
  z-index: 1000;
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 56px 56px 0;
  filter: drop-shadow(${({ theme, shadowed }) => (shadowed ? theme.shadows.card : '0 0 0 0 transparent')});
  transition: filter 300ms ease;
`;

export const Header: FC = () => {
  const { setIsAsideOpen, setIsRightDrawerOpen } = useContext(LayoutCTX);

  const { user } = useAppSelector((state) => state.auth);

  const [shadowed, setShadowed] = useState<boolean>(false);

  const hanleShadowed = useCallback(() => {
    setShadowed(window.scrollY > 56 * 2);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', hanleShadowed);
    return () => document.removeEventListener('scroll', hanleShadowed);
  }, [hanleShadowed]);

  return (
    <HeaderStyled shadowed={shadowed}>
      {!user?.isAnonymous && <Button IconLeft={MeatballsIcon} onClick={() => setIsAsideOpen((prev) => !prev)} />}

      <SearchField />

      {!user?.isAnonymous && <Button IconLeft={SettingsIcon} onClick={() => setIsRightDrawerOpen((prev) => !prev)} />}
    </HeaderStyled>
  );
};
