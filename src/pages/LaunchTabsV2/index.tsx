import React, { FC } from 'react';

import { BookmarksTabs } from '@src/features/bookmarksTabs';
import { Bookmarks } from '@src/features/bookmarks';

const LaunchTabs: FC = () => {
  return (
    <>
      <BookmarksTabs />
      <Bookmarks />
    </>
  );
};

export { LaunchTabs };
