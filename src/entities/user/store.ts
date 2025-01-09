import { createStore, createEvent } from 'effector';

import type { LaunchUser } from './interfaces';

const NULL_USER: LaunchUser = {
  uid: null,
  username: null,
  email: null,
  avatar: null,
};

const updateUser = createEvent<LaunchUser>();
const resetUser = createEvent();

const $userStore = createStore<LaunchUser>(NULL_USER);

$userStore.on(updateUser, (_, userData) => userData).on(resetUser, () => NULL_USER);

export { $userStore, updateUser, resetUser };
