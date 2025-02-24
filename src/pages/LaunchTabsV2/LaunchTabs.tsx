import React, { FC, memo, useEffect } from 'react';
import styled from 'styled-components';
import { useUnit as UseEffectoUnit } from 'effector-react';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { useBookmarksData } from '@src/entities/bookmarks';

import { BookmarksTabs } from '@src/features/bookmarksTabs';
import { Bookmarks } from '@src/features/bookmarks';

const LaunchTabsContainer = styled.div`
  width: 100%;
  padding: 56px 0;
`;

const LaunchTabs: FC = memo(() => {
  const { uid } = UseEffectoUnit($userStore);
  useBookmarksData(uid);

  useEffect(() => {
    setHeaderMidComponent(BookmarksTabs);

    return () => {
      setHeaderMidComponent(null);
    };
  }, []);

  return (
    <LaunchTabsContainer>
      <Bookmarks />
    </LaunchTabsContainer>
  );
});

export { LaunchTabs };
