import { createStore } from 'effector';
import { NULL_USER } from './contants';
import type { LaunchStoreUser } from './interfaces';
import { omit } from 'lodash';

import { getUserData } from './api';

const $userStore = createStore<LaunchStoreUser>(NULL_USER);

$userStore.on(getUserData.doneData, (_, userData) => omit(userData, 'pages', 'settings'));

export { $userStore };
