import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import { auth } from '@src/api';

import { setSettings, type SettingsStore } from '@src/entities/settings';
import { setAppLoading } from '@src/entities/app';
import { updateUser } from '@src/entities/user';

const useAuthState = () => {
  useEffect(() => {
    setAppLoading(true);

    if ('settings' in localStorage && 'bookmarks' in localStorage) {
      setAppLoading(false);
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!!user) {
        updateUser({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });

        const settingsSnap = await getDoc(doc(fsdb, 'users', user.uid));

        if (!!settingsSnap.exists()) setSettings(settingsSnap.data().settings as SettingsStore);
      }

      setAppLoading(false);
    });

    return () => unsub();
  }, []);
};

export { useAuthState };
