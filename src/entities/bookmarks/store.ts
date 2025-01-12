import { createStore, createEvent } from 'effector';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import { DEFAULT_CARDS_STORE } from './constants';

import type {
  BookmarksStore,
  BookmarkTabProps,
  RemoveCardPayload,
  ReorderCardPayload,
  BasePayload,
  CreateCardPayload,
} from './interfaces';

const setCurrentTab = createEvent<string>();
const setTabs = createEvent<BasePayload>();
const setTabsWoDb = createEvent<BookmarkTabProps[]>();
const createTab = createEvent<BasePayload>();
const removeTab = createEvent<BasePayload>();

const createCard = createEvent<CreateCardPayload>();
const removeCard = createEvent<RemoveCardPayload>();
const reorderCards = createEvent<ReorderCardPayload>();

const $bookmarksStore = createStore<BookmarksStore>(DEFAULT_CARDS_STORE);

const updateDatabases = (uid: string | null, tabs: BookmarkTabProps[]) => {
  localStorage.setItem('tabs', JSON.stringify(tabs));
  if (!!uid) updateDoc(doc(collection(fsdb, 'users'), uid), { pages: tabs });
};

$bookmarksStore
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }))
  //
  .on(setTabs, (prevState, { uid, tabs }) => {
    updateDatabases(uid, tabs);
    return { ...prevState, tabs };
  })
  .on(setTabsWoDb, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(createTab, (prevState, { uid, tabs, tabName }) => {
    const newFullTabs = [...tabs, { name: tabName, pages: [] }];
    updateDatabases(uid, newFullTabs);
    return { ...prevState, tabs: newFullTabs };
  })
  .on(removeTab, (prevState, { uid, tabs, tabName }) => {
    const newFullTabs = [...tabs];
    const removeTabIdx = newFullTabs.findIndex((el) => el.name === tabName);

    if (removeTabIdx < 0) return { ...prevState, tabs };

    newFullTabs.splice(removeTabIdx, 1);

    updateDatabases(uid, newFullTabs);

    const isSelectedTabRemove = prevState.currentTab === tabName;

    return {
      currentTab: isSelectedTabRemove ? 'Home' : prevState.currentTab,
      tabs: newFullTabs,
    };
  })
  //
  .on(createCard, (prevState, { uid, tabName, tabs, card }) => {
    const newFullTabs = [...tabs];
    const updatedTabIdx = newFullTabs.findIndex((el) => el.name === tabName);

    if (updatedTabIdx < 0) return { ...prevState, tabs };

    newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: [...tabs[updatedTabIdx].pages, card] });

    updateDatabases(uid, newFullTabs);

    return { ...prevState, tabs: newFullTabs };
  })
  .on(removeCard, (prevState, { uid, tabs, tabName, cardIdx }) => {
    const newFullTabs = [...tabs];
    const updatedTabIdx = newFullTabs.findIndex((el) => el.name === tabName);

    if (updatedTabIdx < 0) return { ...prevState, tabs };

    const updatedCards = [...tabs[updatedTabIdx].pages];
    updatedCards.splice(cardIdx, 1);

    newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: updatedCards });

    updateDatabases(uid, newFullTabs);
    return { ...prevState, tabs: newFullTabs };
  })
  .on(reorderCards, (prevState, { uid, tabs, tabName, reorderedCards }) => {
    const newFullTabs = [...tabs];
    const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);

    if (updatedTabIdx < 0) return { ...prevState, tabs };

    newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: reorderedCards });

    updateDatabases(uid, newFullTabs);
    return { ...prevState, tabs: newFullTabs };
  });

export {
  $bookmarksStore,
  //
  setCurrentTab,
  //
  setTabs,
  setTabsWoDb,
  createTab,
  removeTab,
  //
  createCard,
  removeCard,
  reorderCards,
};
