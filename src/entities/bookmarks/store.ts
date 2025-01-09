import { createStore, createEvent } from 'effector';
import { getUserData } from '@src/entities/user';

import { DEFAULT_PAGES } from './constants';
import type { BookmarksStore, BookmarkTabProps, BookmarkCardProps } from './interfaces';

const DEFAULT_APP_STORE: BookmarksStore = {
  currentTab: DEFAULT_PAGES[0].name,
  tabs: DEFAULT_PAGES,
};

const setCurrentTab = createEvent<string>();
const setTabs = createEvent<BookmarkTabProps[]>();

const $bookmarksStore = createStore<BookmarksStore>(DEFAULT_APP_STORE);

$bookmarksStore
  .on(getUserData.doneData, (prevState, fsUser) => ({
    ...prevState,
    tabs: fsUser.pages,
  }))
  .on(setTabs, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }));

export { $bookmarksStore, setTabs, setCurrentTab };
