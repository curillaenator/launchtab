import { useMutation } from '@tanstack/react-query';
import type { RichTextJsonContent } from '@launch-ui/richtext';
import LZString from 'lz-string';
import { createNoteMutationQuery } from '../api';

import type { LaunchUnitProps } from '../interfaces';

interface CreateNoteMutationPayload {
  formData: Partial<LaunchUnitProps> & { noteBody: RichTextJsonContent | string };
}

interface UseNoteCreateOptions {
  uid: string;
  parentUnitId: string;
  parentSpaceId?: string;
  onSuccess?: (data: { createdUnitId: string }) => void;
}

const useNoteCreate = (options: UseNoteCreateOptions) => {
  const { uid, parentUnitId, parentSpaceId, onSuccess } = options;

  return useMutation({
    mutationFn: async (payload: CreateNoteMutationPayload) => {
      const { formData } = payload;
      const zippedBody = LZString.compressToBase64(JSON.stringify(formData.noteBody));

      return createNoteMutationQuery({
        uid,
        parentUnitId,
        parentSpaceId,
        formData: { ...formData, noteBody: zippedBody },
      });
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};

export { useNoteCreate };
