import React, { FC } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/hooks';

import { SearchField } from './components/SearchField';
import { BtnIcon } from '@launch-ui/button';

const HeaderStyled = styled.header`
  --header-pd: 64px;

  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  padding: var(--header-pd);

  @media (min-width: 1920px) {
    --header-pd: 96px;
  }

  .logo {
    position: absolute;
    top: var(--header-pd);
    left: var(--header-pd);
    width: 56px;
    height: 56px;
    object-fit: cover;
  }

  .header-button {
    position: absolute;
    top: var(--header-pd);
    right: var(--header-pd);
  }
`;

interface HeaderProps {
  isAnon: boolean;
  setSettingsModal: () => void;
}

export const Header: FC<HeaderProps> = (props) => {
  const { isAnon, setSettingsModal } = props;

  const isDataSyncing = useAppSelector((state) => state.loadings.isDataSyncing);

  return (
    <HeaderStyled>
      <SearchField />

      {!isAnon && (
        <div className='header-button'>
          <BtnIcon iconName='settings' handler={setSettingsModal} isLoading={isDataSyncing} />
        </div>
      )}
    </HeaderStyled>
  );
};
