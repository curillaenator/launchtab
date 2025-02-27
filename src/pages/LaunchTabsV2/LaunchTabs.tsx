import React, { FC, memo, useEffect } from 'react';
import styled from 'styled-components';
import { useUnit as UseEffectoUnit } from 'effector-react';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { useBookmarksData } from '@src/entities/bookmarks';

import { Loader } from '@src/features/loader';
import { BookmarksTabs } from '@src/features/bookmarksTabs';
import { Bookmarks } from '@src/features/bookmarks';

const LaunchTabsContainer = styled.div`
  width: 100%;
  padding: 56px 0;
`;

const LaunchTabs: FC = memo(() => {
  const { uid } = UseEffectoUnit($userStore);
  const { isBookmarksDataLoading } = useBookmarksData(uid);

  useEffect(() => {
    setHeaderMidComponent(BookmarksTabs);

    return () => {
      setHeaderMidComponent(null);
    };
  }, []);

  if (isBookmarksDataLoading)
    return (
      <LaunchTabsContainer>
        <Loader view='fit-parent' iconSize='56px' />
      </LaunchTabsContainer>
    );

  return (
    <LaunchTabsContainer>
      <Bookmarks />
    </LaunchTabsContainer>
  );
});

export { LaunchTabs };
