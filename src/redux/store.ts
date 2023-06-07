import { configureStore } from '@reduxjs/toolkit';

import { auth } from './reducers/auth';
import { bookmarks } from './reducers/bookmarks';
import { settings } from './reducers/settings';
import { loadings } from './reducers/loadings';

export const store = configureStore({
  reducer: { auth, bookmarks, settings, loadings },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ["payload.user"],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

// (window as any).store = store;
