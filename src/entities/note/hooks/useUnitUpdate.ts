import { useMutation } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';

import { $userStore } from '../../user';
import { updateUnitMutation } from '../api';

interface UseUnitUpdateProps {
  unitCode: string;
  onSuccess?: () => void;
}

interface SetupFormData {
  name: string;
  locked: boolean;
}

const useUnitUpdate = ({ unitCode, onSuccess }: UseUnitUpdateProps) => {
  const { uid } = useEffectorUnit($userStore);

  return useMutation({
    mutationFn: async (setupFormData: SetupFormData) =>
      updateUnitMutation(uid!, unitCode, {
        unitName: setupFormData.name,
        locked: setupFormData.locked,
      }),

    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export { useUnitUpdate };
