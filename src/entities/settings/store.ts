import { createStore, createEvent, createEffect } from 'effector';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import { getUserData } from '@src/entities/user';
import type { SettingsStore } from './interfaces';

const DEFAULT_SETTINGS: SettingsStore = {
  isDynamicWallpaper: true,
  dynamicWallpaper: 'clouds',
  wallpaper: null,
  darkMode: false,
  themeName: 'defaultTheme',
};

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
  .on(getUserData.doneData, (prevState, fsUser) => ({
    ...prevState,
    ...fsUser.settings,
  }))
  .on(setSettings, (prevState, newSettings) => ({
    ...prevState,
    ...newSettings,
  }))
  .on(saveSettings.doneData, (prevState, newSettings) => ({
    ...prevState,
    ...newSettings,
  }));

export { $settingsStore, setSettings, saveSettings };
