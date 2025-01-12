import { createStore, createEvent } from 'effector';

import { NULL_USER } from './contants';
import type { LaunchStoreUser } from './interfaces';

const setUser = createEvent<LaunchStoreUser>();

const $userStore = createStore<LaunchStoreUser>(NULL_USER);

$userStore.on(setUser, (_, userData) => userData);

export { $userStore, setUser };
