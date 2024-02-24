import React, { FC, useContext, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { BtnIcon } from '@launch-ui/button';

import { useAppSelector } from '@src/hooks/hooks';

import { LayoutCTX } from '@src/layout';

import { SearchField } from './components/SearchField';

const HeaderStyled = styled.header<{ shadowed: boolean }>`
  z-index: 1000;
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 56px 56px 0;
  filter: drop-shadow(0 0 8px ${({ theme, shadowed }) => (shadowed ? theme.primary[500] : 'transparent')});
  transition: filter 300ms ease;
`;

export const Header: FC = () => {
  const { setIsAsideOpen, setIsRightDrawerOpen } = useContext(LayoutCTX);

  const { user } = useAppSelector((state) => state.auth);
  const { isDataSyncing } = useAppSelector((state) => state.loadings);

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
      {!user?.isAnonymous && (
        <BtnIcon iconName='menu' handler={() => setIsAsideOpen((prev) => !prev)} isLoading={isDataSyncing} />
      )}

      <SearchField />

      {!user?.isAnonymous && (
        <BtnIcon iconName='settings' handler={() => setIsRightDrawerOpen(true)} isLoading={isDataSyncing} />
      )}
    </HeaderStyled>
  );
};
