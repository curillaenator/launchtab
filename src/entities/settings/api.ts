import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { SettingsStore } from './interfaces';

const updateSettings = (userID: string, settings: Partial<SettingsStore>): Promise<Partial<SettingsStore>> =>
  updateDoc(doc(collection(fsdb, 'users'), userID), { settings }).then(() => settings);

export { updateSettings };
