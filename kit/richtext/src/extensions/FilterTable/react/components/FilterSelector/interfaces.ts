import type { Dispatch, SetStateAction } from 'react';
import type { SortDirection } from 'tabulator-tables';

import type { TabulatorRef } from '../../interfaces';

type FilterType =
  | 'notLike'
  | 'like'
  | 'notEqual'
  | 'equal'
  | 'lessThan'
  | 'greaterThan'
  | 'equalSelect'
  | 'notEqualSelect';

interface FilterSelectItem {
  tabulatorKey: FilterType;
  key: FilterType;
}

interface FilterItemType {
  col: string;
  type: FilterType;
  value: string;
}

interface SortItemType {
  column: string;
  dir: SortDirection;
}

interface FilterChipProps {
  col: string;
  type: FilterType;
  values: string[];
  tabultorRef?: React.MutableRefObject<TabulatorRef | null>;
}

interface FilterSelectorProps {
  tabultorRef: React.MutableRefObject<TabulatorRef | null>;
  setIsSaveFiltersSortBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FilterChipAddProps {
  controls: {
    isAdd: boolean;
    setIsAdd: Dispatch<SetStateAction<boolean>>;

    selectedCol: string;
    setSelectedCol: Dispatch<SetStateAction<string>>;

    selectedFilterType: FilterSelectItem;
    setSelectedFilterType: Dispatch<SetStateAction<FilterSelectItem>>;

    valueSelectorItems: string[];

    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;

    isValueSelector: boolean;
  };
}

export type {
  FilterType,
  FilterSelectItem,
  FilterItemType,
  SortItemType,
  FilterChipProps,
  FilterSelectorProps,
  FilterChipAddProps,
};
