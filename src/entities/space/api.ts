import { doc, getDoc, collection, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { HierarchyItem as LaunchUnitProps } from '@launch-ui/hierarchy';
import type { LaunchSpaceProps } from './interfaces';

const updateLastViewedSpace = async (uid: string, lastViewedSpace: string) => {
  await updateDoc(doc(fsdb, 'users', uid), { lastViewedSpace });
};

const createSpaceQuery = async (uid: string, spaceFormData: LaunchSpaceProps) => {
  const { name } = spaceFormData;

  const space: Omit<LaunchSpaceProps, 'spaceCode'> = { name, createdAt: Date.now(), createdBy: uid };

  const docRef = await addDoc(collection(fsdb, 'spaces'), space);

  await updateDoc(doc(fsdb, 'users', uid), { spaces: arrayUnion(docRef.id), lastViewedSpace: docRef.id });

  return { createdSpaceCode: docRef.id };
};

const getUserSpacesQuery = async (spaceIds: string[]) => {
  const userSpacesDto = await Promise.all(spaceIds.map((spaceId) => getDoc(doc(fsdb, 'spaces', spaceId))));

  const userSpaces = await Promise.all(
    userSpacesDto.map((spaceSnap) => {
      if (!spaceSnap.exists()) return null;
      return { ...spaceSnap.data(), spaceCode: spaceSnap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchSpaceProps[]);

  return userSpaces;
};

const getSpaceUnitsQuery = async (unitIds: string[]) => {
  const spaceUnitsDto = await Promise.all(unitIds.map((unitId) => getDoc(doc(fsdb, 'units', unitId))));

  const spaceUnits = await Promise.all(
    spaceUnitsDto.map((unitSnap) => {
      if (!unitSnap.exists()) return null;
      return { ...unitSnap.data(), code: unitSnap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchUnitProps[]);

  return spaceUnits;
};

export { getUserSpacesQuery, getSpaceUnitsQuery, createSpaceQuery, updateLastViewedSpace };
