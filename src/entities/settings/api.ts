import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';
import type { SettingsStore } from './interfaces';

const saveSettingsQuery = ({ uid, settings }: { uid: string | null; settings: SettingsStore }) => {
  if (!uid) return;
  updateDoc(doc(collection(fsdb, 'users'), uid), { settings });
};

export { saveSettingsQuery };
