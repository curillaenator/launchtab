import { useLocation, useMatch } from 'react-router-dom';

import { useHierarchyContext } from '../../../context';
import { HierarchyItem } from '../../../interfaces';
import { useEffect } from 'react';

export const useActiveWatch = (item: { code: string }, setActive: React.Dispatch<boolean>) => {
  const {
    // search,
    pathname,
  } = useLocation();

  const { linkPattern, matchRoutePattern } = useHierarchyContext();

  const match = useMatch(matchRoutePattern?.(item as HierarchyItem) || '/notes/:noteId');

  useEffect(() => {
    setActive(!!(pathname === linkPattern(item as HierarchyItem) || match?.params.noteId === item.code));
  }, [match]);
};
