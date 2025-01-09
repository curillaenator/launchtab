import { createStore, createEvent } from 'effector';

import { getUserData, resetUser } from '@src/entities/user';
import { reorderTabs, reorderCards, createTab, createCard } from './api';

import { DEFAULT_APP_STORE } from './constants';
import type { BookmarksStore } from './interfaces';

const setCurrentTab = createEvent<string>();
const $bookmarksStore = createStore<BookmarksStore>(DEFAULT_APP_STORE);

$bookmarksStore
  .on(resetUser, () => DEFAULT_APP_STORE)
  .on(createTab.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(createCard.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderTabs.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderCards.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(getUserData.doneData, (prevState, userData) => ({ ...prevState, tabs: userData.pages }))
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }));

export { $bookmarksStore, setCurrentTab, reorderCards, reorderTabs, createTab, createCard };
