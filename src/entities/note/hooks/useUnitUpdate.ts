import { updateUnitMutation } from '../api';
import { useMutation } from '@tanstack/react-query';

interface UseUnitUpdateProps {
  unitCode: string;
  onSuccess?: () => void;
}

const useUnitUpdate = ({ unitCode, onSuccess }: UseUnitUpdateProps) =>
  useMutation({
    mutationFn: async (setupFormData: { name: string }) => {
      return updateUnitMutation(unitCode, setupFormData.name);
    },

    onSuccess: () => {
      onSuccess?.();
    },
  });

export { useUnitUpdate };
