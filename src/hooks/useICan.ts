import { useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { $userStore } from '@src/entities/user';

import { LaunchUnitProps } from '@src/entities/note';

const useICan = () => {
  const { uid } = useEffectorUnit($userStore);

  const iCanEditUnit = useCallback((unit?: LaunchUnitProps | null) => unit?.createdBy === uid, [uid]);

  return {
    edit: iCanEditUnit,
  };
};

export { useICan };
