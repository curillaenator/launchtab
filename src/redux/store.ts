import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth';
import { bookmarks } from './reducers/bookmarks';
import { settings } from './reducers/settings';
import { loadings } from './reducers/loadings';

export const store = configureStore({
  reducer: { auth: authReducer, bookmarks, settings, loadings },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser', 'auth/signIn/fulfilled'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).store = store;
