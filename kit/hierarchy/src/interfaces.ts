// import type { HierarchyItemAction } from './components/Actions';

interface HierarchyItem {
  code: string;
  type: 'note';
  name: string;
  order: number;
  children?: HierarchyItem[];
}

interface HierarchyServiceItem {
  code: string;
  path: string[];
  isDrag: boolean;
  isExpanded: boolean;
  isPending: boolean;
}

type AsyncItemLoadStatus = 'success' | 'error';
type FoldableStateItem = 'isActionsOpened' | 'isHovered' | 'isPending' | 'isActive' | 'isMouseOver';

interface FoldableItemAction {
  key: FoldableStateItem;
  payload: boolean;
}

interface HierarchyProps {
  /** включение DragNDrop */
  // isDraggable?: boolean;
  /** набор экшенов для каждого элемента */
  // actions?: HierarchyItemAction[];
  /** колбек ленивой подгрузки элементов */
  onAsyncLoad: (item: HierarchyItem | null) => Promise<HierarchyItem[]>;
  /** функция генерации ссылок для элементов */
  linkPattern: (item: HierarchyItem) => string;
  /** функция генерации matchRoute для элементов в фуллПейдж */
  matchRoutePattern?: (item: HierarchyItem) => string;
  /** колбек для получения текущей высоты контейнера компонента в пкс */
  onHeightChanged?: (height: number) => void;
}

export type {
  HierarchyProps,
  HierarchyItem,
  HierarchyServiceItem,
  //
  FoldableItemAction,
  FoldableStateItem,
  AsyncItemLoadStatus,
};
