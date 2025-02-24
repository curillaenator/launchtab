import { useQuery } from '@tanstack/react-query';
import LZString from 'lz-string';
import { getNoteBodyQuery } from '../api';

interface UseNoteBodyDataProps {
  uid: string | null;
  routerNoteId: string | null;
}

const useNoteBodyData = ({ uid, routerNoteId }: UseNoteBodyDataProps) =>
  useQuery({
    queryKey: ['unit-note-body-query', uid, routerNoteId],
    queryFn: () => getNoteBodyQuery(routerNoteId!),
    enabled: !!uid && !!routerNoteId,
    staleTime: 0,
    select: (data) => (data ? LZString.decompressFromBase64(data) : null),
  });

export { useNoteBodyData };
