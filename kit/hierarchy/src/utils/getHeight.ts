// import type { HierarchyState } from '../state/interfaces';
// import type { HierarchyItem } from '../interfaces';
// import { DEFAULT_ITEM_STATE, ITEM_HEIGHT } from '../constants';

// const cache = new WeakMap();

// export const getHeight = (item: HierarchyItem, state: HierarchyState[string]): number => {
//   if (!cache.has(state)) {
//     cache.set(state, new WeakMap());
//   }
//   const cached = cache.get(state);

//   if (cached.has(item)) {
//     return cached.get(item);
//   }
//   const itemState = state[item.id] || DEFAULT_ITEM_STATE;

//   let result = 0;

//   if (item.childList && itemState.isExpanded) {
//     result += ITEM_HEIGHT * item.childList.length;
//     result += item.childList.map((item) => getHeight(item, state)).reduce((a, b) => a + b, 0);
//   }

//   cached.set(item, result);

//   return result;
// };
