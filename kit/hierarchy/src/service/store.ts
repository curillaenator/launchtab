import { createEvent, createStore } from 'effector';
import { omit } from 'lodash';

import { getPathKey } from '../utils/getPathKey';

import { HierarchyItem, HierarchyServiceItem, HierarchyState } from '../interfaces';

interface HierarchyServicePayload {
  path: string[];
  serviceItem: Partial<HierarchyServiceItem>;
  targetPath?: string[];
  dtoItem?: HierarchyItem;
}

const DEFAULT_ITEM_STATE: HierarchyServiceItem = {
  code: '',
  path: [],
  isDrag: false,
  isExpanded: false,
  isPending: false,
};

// const

const registerHierarchyItem = createEvent<HierarchyItem & { path: string[] }>();
const updateHierarchy = createEvent<HierarchyServicePayload>();

const HIERARCHY_ITEMS_DATA = new Map<string, HierarchyItem>();

const $hierarchyStore = createStore<HierarchyState>({});

$hierarchyStore
  .on(registerHierarchyItem, (prev, dtoItem) => {
    const itemPath = [...dtoItem.path, dtoItem.code];
    const pathKey = getPathKey(itemPath);

    if (!!prev[pathKey]) return prev;

    HIERARCHY_ITEMS_DATA.set(pathKey, dtoItem);

    return { ...prev, [pathKey]: { ...DEFAULT_ITEM_STATE, path: itemPath } };
  })
  .on(updateHierarchy, (prev, payload) => {
    const { targetPath, path, dtoItem, serviceItem } = payload;

    // hits on no drag actions
    // targetPath should be provided only on drag end action
    if (!targetPath || !dtoItem) {
      const pathKey = getPathKey(path);

      return {
        ...prev,
        [pathKey]: {
          ...prev[pathKey],
          ...serviceItem,
        },
      };
    }

    // on drag upgates
    const targetPathKey = getPathKey(targetPath);
    const prevPathKey = getPathKey(path);

    // Update items data cache
    HIERARCHY_ITEMS_DATA.delete(prevPathKey);
    HIERARCHY_ITEMS_DATA.set(targetPathKey, dtoItem);

    // Update store
    return {
      ...omit(prev, prevPathKey),
      [targetPathKey]: {
        ...prev[prevPathKey],
        ...serviceItem,
      },
    };
  });

export { $hierarchyStore, registerHierarchyItem, updateHierarchy, HIERARCHY_ITEMS_DATA, DEFAULT_ITEM_STATE };
