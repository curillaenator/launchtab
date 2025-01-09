import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@src/api';

import { setSettings } from '@src/entities/settings';
import { setAppLoading } from '@src/entities/app';
import { getUserData } from '@src/entities/user';

const useAuthState = () => {
  useEffect(() => {
    const localSettings = localStorage.getItem('settings');
    const localBookmarks = localStorage.getItem('bookmarks');

    if (localSettings && localBookmarks) {
      setSettings(JSON.parse(localSettings));
      setAppLoading(false);
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!!user) {
        getUserData(user.uid);
      } else {
        setAppLoading(false);
      }
    });

    return () => unsub();
  }, []);
};

export { useAuthState };
