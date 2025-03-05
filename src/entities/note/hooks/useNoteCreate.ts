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
  path: string[];
  parentUnitId: string | null;
  parentSpace: { spaceCode: string | null; hierarchy?: Record<string, number> } | null;
  createUnitIdx: number;
  onSuccess?: (data: { createdUnitId: string | null }) => void;
}

const useNoteCreate = (options: UseNoteCreateOptions) => {
  const { uid, path, parentUnitId, parentSpace, onSuccess, createUnitIdx } = options;

  return useMutation({
    mutationFn: async (payload: CreateNoteMutationPayload) => {
      const { formData } = payload;
      const zippedBody = LZString.compressToBase64(JSON.stringify(formData.noteBody));

      return createNoteMutationQuery({
        uid,
        path,
        parentUnitId,
        parentSpace,
        createUnitIdx,
        formData: { ...formData, noteBody: zippedBody },
      });
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};

export { useNoteCreate };
