import { doc, getDoc, collection, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { LaunchSpaceProps, LaunchUnitProps } from './interfaces';

const updateLastViewedSpace = async (uid: string, lastViewedSpace: string) => {
  await updateDoc(doc(fsdb, 'users', uid), { lastViewedSpace });
};

const createSpaceQuery = async (uid: string, spaceFormData: LaunchSpaceProps) => {
  const { name } = spaceFormData;

  const space: Omit<LaunchSpaceProps, 'spaceCode'> = { name, createdAt: Date.now(), createdBy: uid, units: [] };

  const docRef = await addDoc(collection(fsdb, 'spaces'), space);

  await updateDoc(doc(fsdb, 'users', uid), { spaces: arrayUnion(docRef.id), lastViewedSpace: docRef.id });

  return { createdSpaceCode: docRef.id };
};

const getUserSpacesQuery = async (uid: string) => {
  const spaceIds: string[] = await getDoc(doc(fsdb, 'users', uid)).then((snap) =>
    snap.exists() ? snap.data()?.['spaces'] : [],
  );

  const userSpacesDto = await Promise.all(spaceIds.map((spaceId) => getDoc(doc(fsdb, 'spaces', spaceId))));

  const userSpaces = await Promise.all(
    userSpacesDto.map((snap) => {
      if (!snap.exists()) return null;
      return { ...snap.data(), spaceCode: snap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchSpaceProps[]);

  return userSpaces;
};

const getSpaceUnitsQuery = async (unitIds: string[]) => {
  const spaceUnitsDto = await Promise.all(unitIds.map((unitId) => getDoc(doc(fsdb, 'units', unitId))));

  const spaceUnits = await Promise.all(
    spaceUnitsDto.map((snap) => {
      if (!snap.exists()) return null;
      return { ...snap.data(), unitCode: snap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchUnitProps[]);

  return spaceUnits;
};

export { getUserSpacesQuery, getSpaceUnitsQuery, createSpaceQuery, updateLastViewedSpace };
