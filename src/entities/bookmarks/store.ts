import { createStore, createEvent } from 'effector';

import { getUserData } from '@src/entities/user';
import { reorderTabs, reorderCards, createTab, createCard, removeCards, removeTabs } from './api';

import { DEFAULT_CARDS_STORE } from './constants';
import type { BookmarksStore, BookmarkTabProps } from './interfaces';

const setCurrentTab = createEvent<string>();
const setTabs = createEvent<BookmarkTabProps[]>();

const localTabs = localStorage.getItem('tabs');
const $bookmarksStore = createStore<BookmarksStore>(
  localTabs ? { currentTab: 'Home', tabs: JSON.parse(localTabs) } : DEFAULT_CARDS_STORE,
);

$bookmarksStore
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }))
  .on(setTabs, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(removeTabs.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(removeCards.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(createTab.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(createCard.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderTabs.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderCards.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(getUserData.doneData, (prevState, userData) => ({ ...prevState, tabs: userData.pages }));

export { $bookmarksStore, setCurrentTab, setTabs };
