import { updateUnitMutation } from '../api';
import { useMutation } from '@tanstack/react-query';

interface UseUnitUpdateProps {
  unitCode: string;
  onSuccess?: () => void;
}

interface SetupFormData {
  name: string;
  locked: boolean;
}

const useUnitUpdate = ({ unitCode, onSuccess }: UseUnitUpdateProps) =>
  useMutation({
    mutationFn: async (setupFormData: SetupFormData) =>
      updateUnitMutation(unitCode, {
        unitName: setupFormData.name,
        locked: setupFormData.locked,
      }),

    onSuccess: () => {
      onSuccess?.();
    },
  });

export { useUnitUpdate };
