import { createContext, useContext } from 'react';

import type { FilterTableAtributes, TableInitData } from '../core/interfaces';
import type { FilterControls } from './interfaces';

interface FilterTableContext {
  nodeAttrs: FilterTableAtributes;

  isTableReady: boolean;
  canBeFiltered: boolean;
  selected: boolean;

  headingNames: string[];

  initTableData: TableInitData;

  filterControlsRef?: React.MutableRefObject<FilterControls | null>;

  setIsTableReady: (isTableReady: boolean) => void;
  setHeadingNames: (headingNames: string[]) => void;
  updateAttributes: (attrs: FilterTableAtributes) => void;
}

const $filterTableCtx = createContext<FilterTableContext>({
  nodeAttrs: {
    columnWidths: [],
    style: null,
    filters: [],
    sort: null,
    summaryRow: {},
    calcColumn: null,
  },

  initTableData: {
    columns: [],
    data: [],
  },

  isTableReady: false,
  canBeFiltered: false,
  selected: false,

  headingNames: [],

  updateAttributes: () => {},
  setIsTableReady: () => {},
  setHeadingNames: () => {},
});

const useFilterTableCtx = () => useContext($filterTableCtx);

export { $filterTableCtx, useFilterTableCtx };
