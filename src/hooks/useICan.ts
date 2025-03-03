import { useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
// import { useLayoutContext } from './useLayoutContext';

import { $userStore } from '@src/entities/user';

import { LaunchNoteProps } from '@src/entities/note';

const useICan = () => {
  const { uid } = useEffectorUnit($userStore);
  // const { currentSpaceId } = useLayoutContext();

  const iCanEditUnit = useCallback((unit?: LaunchNoteProps | null) => unit?.createdBy === uid, [uid]);

  return {
    edit: iCanEditUnit,
  };
};

export { useICan };
