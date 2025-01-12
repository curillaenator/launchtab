import { signOut, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { fsdb, auth } from '@src/api/firebase';

import { setAppLoading } from '../app';

import { setSettings } from '../settings';
import { setTabsWoDb } from '../bookmarks';
import { setUser } from './store';

import { NULL_USER } from './contants';
import { DEFAULT_PAGES } from '../bookmarks/constants';
import { DEFAULT_SETTINGS } from '../settings/constants';

import type { LaunchUserData } from './interfaces';

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
  setTabsWoDb(DEFAULT_PAGES);
  localStorage.clear();
};

const getUserData = async (user: FirebaseUser | null) => {
  if (!user) {
    setAppLoading(false);
    return;
  }

  const { uid, displayName, email, photoURL } = user;
  const optimisticUserData = { uid, username: displayName, email, avatar: photoURL };

  setUser(optimisticUserData);

  const localSettings = localStorage.getItem('settings');
  const localTabs = localStorage.getItem('tabs');

  if (localSettings) setSettings(JSON.parse(localSettings));
  if (localTabs) setTabsWoDb(JSON.parse(localTabs));
  if (localSettings && localTabs) setAppLoading(false); // will show app with user data from localStorage

  const userSnap = await getDoc(doc(fsdb, 'users', uid)); // check latest data

  // optimistic update data if no db record presented (first login)
  if (!userSnap.exists()) {
    setUser(optimisticUserData);
    setSettings(DEFAULT_SETTINGS);
    setTabsWoDb(DEFAULT_PAGES);
    setAppLoading(false);

    setDoc(doc(fsdb, 'users', user.uid), {
      ...optimisticUserData,
      pages: DEFAULT_PAGES,
      settings: DEFAULT_SETTINGS,
    } as LaunchUserData);

    return;
  }

  const { settings, pages } = userSnap.data() as LaunchUserData;

  // TODO: check for state update requred via localStorage data deep compare
  setUser(userSnap.data() as LaunchUserData);
  setSettings(settings);
  setTabsWoDb(pages);
  setAppLoading(false);
};

export { login, logout, getUserData };
