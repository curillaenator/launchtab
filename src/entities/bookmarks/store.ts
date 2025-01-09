import { createStore, createEvent, createEffect } from 'effector';
import { collection, doc, updateDoc } from 'firebase/firestore';

import { getUserData } from '@src/entities/user';
import { fsdb } from '@src/api/firebase';

import { DEFAULT_PAGES } from './constants';
import type { BookmarksStore, BookmarkTabProps, BookmarkCardProps } from './interfaces';

const DEFAULT_APP_STORE: BookmarksStore = {
  currentTab: 'Home',
  tabs: DEFAULT_PAGES,
};

const setCurrentTab = createEvent<string>();

interface BasePayload {
  uid: string;
  tabName: string;
  tabs: BookmarkTabProps[];
}

interface ReorderCardPayload extends BasePayload {
  reorderedCards: BookmarkCardProps[];
}

const setLocalTabs = (tabs: BookmarkTabProps[]) => localStorage.setItem('tabs', JSON.stringify(tabs));

const reorderTabs = createEffect(({ uid, tabs }: BasePayload) => {
  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: tabs });
  setLocalTabs(tabs);
  return tabs;
});

const reorderCards = createEffect(({ uid, tabs, tabName, reorderedCards }: ReorderCardPayload) => {
  const newFullTabs = [...tabs];
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);

  if (updatedTabIdx < 0) return tabs;

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: reorderedCards });

  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: newFullTabs });
  setLocalTabs(newFullTabs);
  return newFullTabs;
});

const createTab = createEffect(({ uid, tabName, tabs }: BasePayload) => {
  const newFullTabs = [...tabs, { name: tabName, pages: [] }];
  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: newFullTabs });
  setLocalTabs(newFullTabs);
  return newFullTabs;
});

interface CreateCardPayload extends BasePayload {
  card: BookmarkCardProps;
}

const createCard = createEffect(({ uid, tabName, tabs, card }: CreateCardPayload) => {
  const newFullTabs = [...tabs];
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);
  if (updatedTabIdx < 0) return tabs;

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: [...tabs[updatedTabIdx].pages, card] });

  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: newFullTabs });
  setLocalTabs(newFullTabs);
  return newFullTabs;
});

const $bookmarksStore = createStore<BookmarksStore>(DEFAULT_APP_STORE);

$bookmarksStore
  .on(createTab.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(createCard.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderTabs.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(reorderCards.doneData, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(getUserData.doneData, (prevState, userData) => ({ ...prevState, tabs: userData.pages }))
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }));

export { $bookmarksStore, setCurrentTab, reorderCards, reorderTabs, createTab, createCard };
