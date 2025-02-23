import { doc, getDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { LaunchSpaceProps } from './interfaces';

const getUserSpacesQuery = async (spaceIds: string[]) => {
  const userSpacesDto = await Promise.all(spaceIds.map((spaceId) => getDoc(doc(fsdb, 'spaces', spaceId))));

  const userSpaces = await Promise.all(
    userSpacesDto.map((snap) => {
      if (!snap.exists()) return null;
      return { ...snap.data(), spaceCode: snap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchSpaceProps[]);

  return userSpaces;
};

// const getSpaceNotes = async (spaceId: string) => {};

export { getUserSpacesQuery };
