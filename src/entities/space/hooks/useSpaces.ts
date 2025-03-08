import { useQuery } from '@tanstack/react-query';

import { USER_SPACES_QUERY } from '@src/shared/queryKeys';
import { getUserSpacesQuery } from '../api';

interface UseSpacesOptions {
  enabled?: boolean;
}

const useSpaces = (spaces: string[], options?: UseSpacesOptions) =>
  useQuery({
    queryKey: [USER_SPACES_QUERY, spaces],
    queryFn: () => getUserSpacesQuery(spaces),
    enabled: !!options?.enabled,
  });

export { useSpaces };
