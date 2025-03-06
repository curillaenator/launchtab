import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { LaunchUnitProps } from './interfaces';

interface CreateNoteMutationQueryPayload {
  uid: string;
  path: string[];
  formData: Partial<LaunchUnitProps> & { noteBody: string };
  parentUnitId: string | null;
  parentSpace: { spaceCode: string | null; hierarchy?: Record<string, number> } | null;
  createUnitIdx: number;
}

const createNoteMutationQuery = async (payload: CreateNoteMutationQueryPayload) => {
  const { uid, path, formData, parentSpace, parentUnitId, createUnitIdx } = payload;

  const newUnit: Omit<LaunchUnitProps, 'code'> = {
    path,
    name: formData.name || '',
    createdBy: uid,
    createdAt: Date.now(),
  };

  const createdUnitId = await addDoc(collection(fsdb, 'units'), newUnit).then(async ({ id }) => {
    await setDoc(doc(fsdb, 'notes', id), {
      tiptap: formData.noteBody,
      updatedBy: uid,
      updatedAt: Date.now(),
    });

    const dbPath = !!parentSpace?.spaceCode ? 'spaces' : 'units';
    const dbEntityId = parentUnitId || parentSpace?.spaceCode;

    if (!dbEntityId) return null;

    await updateDoc(doc(fsdb, dbPath, dbEntityId), {
      [`hierarchy.${id}`]: createUnitIdx,
    });

    return id;
  });

  return { createdUnitId };
};

const getNoteBodyQuery = async (noteId: string) => {
  const bodySnap = await getDoc(doc(fsdb, 'notes', noteId));

  if (!bodySnap.exists()) return null;

  return bodySnap.data()['tiptap'] as string;
};

const getNoteUnitQuery = async (unitId: string) => {
  const unitSnap = await getDoc(doc(fsdb, 'units', unitId));

  if (!unitSnap.exists()) return null;

  return { ...unitSnap.data(), code: unitSnap.id } as LaunchUnitProps;
};

interface UpdateUnitPayload {
  unitName: string;
  locked: boolean;
}

const updateUnitMutation = async (unitCode: string, payload: UpdateUnitPayload) => {
  const { unitName, locked } = payload;

  await updateDoc(doc(fsdb, 'units', unitCode), { name: unitName, locked });
  return { updatedUnitName: unitName };
};

const updateNoteBodyMutation = async (uid: string, noteId: string, noteBody: string) => {
  let response = { routerNoteId: false };

  await setDoc(doc(fsdb, 'notes', noteId), {
    tiptap: noteBody,
    updatedBy: uid,
    updatedAt: Date.now(),
  }).then(() => (response.routerNoteId = true));

  return response;
};

export {
  getNoteBodyQuery,
  getNoteUnitQuery,
  updateUnitMutation,
  updateNoteBodyMutation,
  createNoteMutationQuery,
  type CreateNoteMutationQueryPayload,
};
