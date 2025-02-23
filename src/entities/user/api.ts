import { signOut, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { omit } from 'lodash';

import { fsdb, auth } from '@src/api/firebase';

import { setAppLoading } from '../app';

import { setSettings } from '../settings';
import { setTabsWithoutDbUpdate } from '../bookmarks';
import { setUser } from './store';

import { NULL_USER } from './contants';
import { DEFAULT_PAGES } from '../bookmarks/constants';
import { DEFAULT_SETTINGS } from '../settings/constants';

import type { LaunchStoreUser } from './interfaces';

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

  const optimisticUserData: LaunchStoreUser = {
    uid,
    username: displayName,
    email,
    avatar: photoURL,
    settings: DEFAULT_SETTINGS,
    spaces: [],
  };

  const userSnap = await getDoc(doc(fsdb, 'users', uid));

  // optimistic update data if no db record presented (first login)
  if (!userSnap.exists()) {
    setUser(optimisticUserData);
    setSettings(optimisticUserData.settings);
    setAppLoading(false);

    setDoc(doc(fsdb, 'users', user.uid), optimisticUserData);

    return;
  }

  const dbUserData = userSnap.data() as LaunchStoreUser;

  if ('pages' in dbUserData) {
    setDoc(doc(fsdb, 'bookmarks', user.uid), { bookmarks: dbUserData['pages'] });
  }

  setUser(omit(dbUserData, 'pages'));
  setSettings(dbUserData.settings);
  // setTabsWithoutDbUpdate(dbUserData.pages);

  setAppLoading(false);
};

export { login, logout, getUserData };
