import { signOut, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { fsdb, auth } from '@src/api/firebase';

import { setAppLoading } from '../app';

import { setSettings } from '../settings';
import { setTabs, setTabsWoDb } from '../bookmarks';
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
};

const getUserData = async (user: FirebaseUser | null) => {
  if (!user) {
    setAppLoading(false);
    return;
  }

  const { uid, displayName, email, photoURL } = user;
  const defaultUser = { uid, username: displayName, email, avatar: photoURL };

  const localSettings = localStorage.getItem('settings');
  const localTabs = localStorage.getItem('tabs');

  if (localSettings && localTabs) {
    // setUser(defaultUser);
    setSettings(JSON.parse(localSettings));
    setTabsWoDb(JSON.parse(localTabs));
    setAppLoading(false);
  }

  const userSnap = await getDoc(doc(fsdb, 'users', uid));

  if (!userSnap.exists()) {
    await setDoc(doc(fsdb, 'users', user.uid), defaultUser);
    setUser(defaultUser);

    setSettings(DEFAULT_SETTINGS);
    setTabs({ uid, tabs: DEFAULT_PAGES, tabName: '' });
    setAppLoading(false);

    return;
  }

  const { settings, pages } = userSnap.data() as LaunchUserData;

  setUser(userSnap.data() as LaunchUserData);
  setSettings(settings);
  setTabsWoDb(pages);
  setAppLoading(false);
};

export { login, logout, getUserData };
