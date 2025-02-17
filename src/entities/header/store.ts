import { createStore, createEvent } from 'effector';

interface HeaderStore {
  isHeaderShadowed: boolean;
}

const setHeaderShadowed = createEvent<boolean>();

const $headerStore = createStore<HeaderStore>({ isHeaderShadowed: false });

$headerStore.on(setHeaderShadowed, (prevAppState, isHeaderShadowed) => ({ ...prevAppState, isHeaderShadowed }));

export { $headerStore, setHeaderShadowed };
