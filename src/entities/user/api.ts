import { signOut, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { fsdb, auth } from '@src/api/firebase';

import { setAppLoading } from '../app';

import { setSettings, SettingsStore } from '../settings';
import { setTabsWithoutDbUpdate, BookmarkTabProps } from '../bookmarks';
import { setUser } from './store';

import { NULL_USER } from './contants';
import { DEFAULT_PAGES } from '../bookmarks/constants';
import { DEFAULT_SETTINGS } from '../settings/constants';

import type { LaunchUserData, LaunchStoreUser } from './interfaces';

const googleProvider = new GoogleAuthProvider();

const login = () => {
  setAppLoading(true);
  signInWithPopup(auth, googleProvider);
};

const logout = () => {
  setAppLoading(true);
  signOut(auth);
  setUser(NULL_USER);
  setSettings(DEFAULT_SETTINGS);
  setTabsWithoutDbUpdate(DEFAULT_PAGES);
  localStorage.clear();
};

const getUserData = async (user: FirebaseUser | null) => {
  if (!user) {
    setAppLoading(false);
    return;
  }

  const { uid, displayName, email, photoURL } = user;
  const optimisticUserData: LaunchStoreUser = { uid, username: displayName, email, avatar: photoURL };
  const optimisticDbData: LaunchUserData = { ...optimisticUserData, pages: DEFAULT_PAGES, settings: DEFAULT_SETTINGS };
  const localDbData: LaunchUserData = { ...optimisticUserData, pages: DEFAULT_PAGES, settings: DEFAULT_SETTINGS };

  setUser(optimisticUserData);

  const localSettings = localStorage.getItem('settings');
  const localTabs = localStorage.getItem('tabs');

  if (localSettings) {
    const lsSettings = JSON.parse(localSettings) as SettingsStore;
    setSettings(lsSettings);
    localDbData.settings = lsSettings;
  }

  if (localTabs) {
    const lsTabs = JSON.parse(localTabs) as BookmarkTabProps[];
    setTabsWithoutDbUpdate(lsTabs);
    localDbData.pages = lsTabs;
  }

  if (localSettings && localTabs) setAppLoading(false); // will show app with user data from localStorage

  const userSnap = await getDoc(doc(fsdb, 'users', uid)); // check latest data

  // optimistic update data if no db record presented (first login)
  if (!userSnap.exists()) {
    setUser(optimisticUserData);
    setSettings(optimisticDbData.settings);
    setTabsWithoutDbUpdate(optimisticDbData.pages);
    setAppLoading(false);

    setDoc(doc(fsdb, 'users', user.uid), optimisticDbData);

    return;
  }

  const dbUserData = userSnap.data() as LaunchUserData;

  // TODO: check for state update requred via localStorage data deep compare
  setUser(dbUserData);
  setSettings(dbUserData.settings);
  setTabsWithoutDbUpdate(dbUserData.pages);
  setAppLoading(false);
};

export { login, logout, getUserData };
