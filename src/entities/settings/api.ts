import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';
import type { SettingsStore } from './interfaces';

const saveSettings = ({ uid, settings }: { uid: string; settings: SettingsStore }) => {
  localStorage.setItem('settings', JSON.stringify(settings));
  if (!!uid) updateDoc(doc(collection(fsdb, 'users'), uid), { settings });
};

export { saveSettings };
