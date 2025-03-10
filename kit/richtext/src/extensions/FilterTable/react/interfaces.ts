import type { Node as ExtensionNode } from '@tiptap/core';
import type { NodeViewRendererProps } from '@tiptap/react';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { TabulatorFull } from 'tabulator-tables';

import type { FilterItemType, SortItemType } from './components';
import type { FilterTableConfig, FilterTableStorage, FilterTableAtributes } from '../core/interfaces';

interface UiWidgetNode extends ProseMirrorNode {
  attrs: FilterTableAtributes;
}

type TabulatorRef = React.MutableRefObject<TabulatorFull | null>;

interface UiWidgetProps extends NodeViewRendererProps {
  extension: ExtensionNode<FilterTableConfig, FilterTableStorage>;
  node: UiWidgetNode;
  selected: boolean;
  deleteNode: () => void;
  updateAttributes: (attrs: FilterTableAtributes) => void;
  getPos: () => number;
}

interface FilterControls {
  filters: FilterItemType[];
  sortBy: SortItemType | null;

  setFilters: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
  setSortBy: React.Dispatch<React.SetStateAction<SortItemType | null>>;

  applyFilters: (filtersToSet: FilterItemType[]) => void;
  applySort: (sortItem: SortItemType | null) => void;

  removeFilter: (filterItemToRemove: FilterItemType) => void;
  removeSort: () => void;
  removeAllFilters: () => void;

  saveSortFiltersToNodeAttrs: () => void;
}

export type { UiWidgetProps, FilterControls, TabulatorRef };
