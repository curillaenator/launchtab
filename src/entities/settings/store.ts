import { createStore, createEvent } from 'effector';

import { DEFAULT_SETTINGS } from './constants';
import type { SettingsStore } from './interfaces';

const setSettings = createEvent<Partial<SettingsStore>>();

const $settingsStore = createStore<SettingsStore>(DEFAULT_SETTINGS);

$settingsStore.on(setSettings, (prevState, settings) => {
  localStorage.setItem('settings', JSON.stringify({ ...prevState, ...settings }));
  return { ...prevState, ...settings };
});

export { $settingsStore, setSettings };
