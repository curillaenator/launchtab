import { createStore, createEvent } from 'effector';

interface AppStore {
  isLoading: boolean;
  isSignInOpen: boolean;
  isAsideOpen: boolean;
  isRightDrawerOpen: boolean;
  isHeaderShadowed: boolean;
}

const DEFAULT_APP_STORE: AppStore = {
  isLoading: true,
  isSignInOpen: false,
  isAsideOpen: false,
  isRightDrawerOpen: false,
  isHeaderShadowed: false,
};

const setAppLoading = createEvent<AppStore['isLoading']>();
const setSignIn = createEvent<AppStore['isSignInOpen']>();
const setAside = createEvent<AppStore['isAsideOpen']>();
const setRightDrawer = createEvent<AppStore['isRightDrawerOpen']>();
const setHeaderShadowed = createEvent<AppStore['isHeaderShadowed']>();

const $appStore = createStore<AppStore>(DEFAULT_APP_STORE);

$appStore
  .on(setAppLoading, (prevAppState, isLoading) => ({ ...prevAppState, isLoading }))
  .on(setAside, (prevAppState, isAsideOpen) => ({ ...prevAppState, isAsideOpen }))
  .on(setSignIn, (prevAppState, isSignInOpen) => ({ ...prevAppState, isSignInOpen }))
  .on(setRightDrawer, (prevAppState, isRightDrawerOpen) => ({ ...prevAppState, isRightDrawerOpen }))
  .on(setHeaderShadowed, (prevAppState, isHeaderShadowed) => ({ ...prevAppState, isHeaderShadowed }));

export { $appStore, setAppLoading, setAside, setSignIn, setRightDrawer, setHeaderShadowed };
