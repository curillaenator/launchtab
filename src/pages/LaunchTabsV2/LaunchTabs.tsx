import React, { FC } from 'react';
import styled from 'styled-components';

import { Tabs } from '@src/components/tabs';
import { Bookmarks } from '@src/components/bookmarks';

const LaunchTabsStyled = styled.main`
  width: 100%;
  padding: 56px;
  padding-top: 96px;
`;

export const LaunchTabs: FC = () => {
  return (
    <LaunchTabsStyled id='launch-app-container' className='launch-app-container'>
      <Tabs />
      <Bookmarks />
    </LaunchTabsStyled>
  );
};
