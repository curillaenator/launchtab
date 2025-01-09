import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@src/api';

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
      }

      setAppLoading(false);
    });

    return () => unsub();
  }, []);
};

export { useAuthState };
