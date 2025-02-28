// import { useEffect } from 'react';
// import { useLocation, useRouteMatch } from 'react-router-dom';

// import { useHierarchyContext } from '../../../context';
// import { HierarchyItem } from '../../../interfaces';

// export const useActiveWatch = (item: HierarchyItem, setActive: React.Dispatch<boolean>) => {
//   const { search, pathname } = useLocation();
//   const { linkPattern, matchRoutePattern, matchActiveItem } = useHierarchyContext();

//   let isActiveByRouteMatch = false;
//   let isActiveByMatcherCallback = false;

//   const match = useRouteMatch<{ unitId: string }>(matchRoutePattern?.(item) || '/defaultroute/:unitId');

//   if (linkPattern) {
//     const { params, isExact } = match || {};
//     const queryParams = new URLSearchParams(search);

//     isActiveByRouteMatch = !!(
//       pathname === linkPattern(item) ||
//       queryParams.get('edit') === item.code ||
//       (isExact && params?.unitId === item.code)
//     );
//   }

//   if (matchActiveItem) {
//     isActiveByMatcherCallback = matchActiveItem(item);
//   }

//   useEffect(() => {
//     setActive(isActiveByRouteMatch || isActiveByMatcherCallback);
//   }, [isActiveByRouteMatch, isActiveByMatcherCallback]);
// };
