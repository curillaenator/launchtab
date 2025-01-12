import { signOut, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createEffect } from 'effector';

import { fsdb, auth } from '@src/api/firebase';

import { setAppLoading } from '../app';

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
};

const getUserData = createEffect(async (user: FirebaseUser | null) => {
  if (!user) {
    setAppLoading(false);
    return { ...NULL_USER, settings: DEFAULT_SETTINGS, pages: DEFAULT_PAGES } as LaunchUserData;
  }

  const userSnap = await getDoc(doc(fsdb, 'users', user.uid));

  if (!userSnap.exists()) {
    const defaultLaunchUserData: LaunchUserData = {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      pages: DEFAULT_PAGES,
      settings: DEFAULT_SETTINGS,
    };

    await setDoc(doc(fsdb, 'users', user.uid), defaultLaunchUserData);
  }

  setAppLoading(false);

  return userSnap.data() as LaunchUserData;
});

export { login, logout, getUserData };
