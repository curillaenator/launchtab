import { createStore, createEvent } from 'effector';
import { NULL_USER } from './contants';
import type { LaunchUser } from './interfaces';

import { getUserData } from './api';

const updateUser = createEvent<LaunchUser>();
const resetUser = createEvent();

const $userStore = createStore<LaunchUser>(NULL_USER);

$userStore
  .on(updateUser, (_, userData) => userData)
  .on(resetUser, () => NULL_USER)
  .on(getUserData.doneData, (_, user) => ({
    uid: user.uid,
    username: user.displayName,
    email: user.email,
    avatar: user.photoURL,
  }));

export { $userStore, updateUser, resetUser };
