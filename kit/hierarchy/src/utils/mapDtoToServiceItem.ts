import type { HierarchyItem, HierarchyServiceItem } from '../interfaces';
import { DEFAULT_ITEM_STATE } from '../service/store';

const mapDtoToServiceItem = (items: HierarchyItem[] = [], path: string[] = []): HierarchyServiceItem[] =>
  items.map(({ code }) => ({
    ...DEFAULT_ITEM_STATE,
    code,
    path: [...path, code],
  }));

export { mapDtoToServiceItem };
