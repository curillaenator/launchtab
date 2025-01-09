import { createStore, createEvent, createEffect } from 'effector';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import { getUserData, resetUser } from '@src/entities/user';

import { DEFAULT_SETTINGS } from './constants';
import type { SettingsStore } from './interfaces';

interface AsyncSettingsPayload {
  uid: string;
  settings: Partial<SettingsStore>;
}

const saveSettings = createEffect(async ({ uid, settings }: AsyncSettingsPayload) =>
  updateDoc(doc(collection(fsdb, 'users'), uid), { settings }).then(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    return settings;
  }),
);

const setSettings = createEvent<Partial<SettingsStore>>();

const $settingsStore = createStore<SettingsStore>(DEFAULT_SETTINGS);

$settingsStore
  .on(resetUser, () => DEFAULT_SETTINGS)
  .on(getUserData.doneData, (prevState, fsUser) => ({ ...prevState, ...fsUser.settings }))
  .on(setSettings, (prevState, newSettings) => ({ ...prevState, ...newSettings }))
  .on(saveSettings.doneData, (prevState, newSettings) => ({ ...prevState, ...newSettings }));

export { $settingsStore, setSettings, saveSettings };
