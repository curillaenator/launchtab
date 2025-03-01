import { getPathKey } from './getPathKey';
import { HIERARCHY_ITEMS_DATA } from '../service/store';
import type { HierarchyState, HierarchyItem } from '../interfaces';
import { ITEM_HEIGHT } from '../constants';
import { keys } from 'lodash';

// const CACHE = new WeakMap();
const CACHE = new WeakMap();

const getHeight = (path: string[], state: HierarchyState): number => {
  const pathKey = getPathKey(path);
  const item = HIERARCHY_ITEMS_DATA.get(pathKey);

  if (!item) return 0;

  if (!CACHE.has(state)) {
    CACHE.set(state, new WeakMap());
  }

  const cached = CACHE.get(state);

  if (cached.has(item)) {
    return cached.get(item);
  }

  const itemState = state[pathKey];

  let result = 0;

  if (item?.hierarchy && itemState.isExpanded) {
    result += ITEM_HEIGHT * keys(item.hierarchy).length;
    result += keys(item.hierarchy)
      .map((code) => getHeight([...path, code], state))
      .reduce((a, b) => a + b, 0);
  }

  cached.set(item, result);

  return result;
};

export { CACHE, getHeight };
