import type { FilterSelectItem, FilterType } from './interfaces';

const FILTER_KEYS_ASSOC: Record<FilterType | 'none', string> = {
  like: 'содержит',
  notLike: 'не содержит',
  equal: 'равенство (значение)',
  equalSelect: 'равенство (выбор)',
  notEqual: 'неравенство (значение)',
  notEqualSelect: 'неравенство (выбор)',
  greaterThan: 'больше чем (числовое)',
  lessThan: 'меньше чем (числовое)',
  none: 'не выбрано',
};

const FILTER_HADNLERS_OR_LOGIC: FilterType[] = ['like', 'equal', 'equalSelect'];

const SELECT_FILTER_TYPE_RE = /^(equal|notequal)select$/;

const TABULATOR_FILTERS: FilterSelectItem[] = [
  {
    tabulatorKey: 'equalSelect',
    key: 'equalSelect',
  },

  {
    tabulatorKey: 'notEqualSelect',
    key: 'notEqualSelect',
  },

  {
    key: 'like',
    tabulatorKey: 'like',
  },

  {
    key: 'notLike',
    tabulatorKey: 'notLike',
  },

  {
    tabulatorKey: 'equal',
    key: 'equal',
  },

  {
    tabulatorKey: 'notEqual',
    key: 'notEqual',
  },

  {
    tabulatorKey: 'lessThan',
    key: 'lessThan',
  },

  {
    tabulatorKey: 'greaterThan',
    key: 'greaterThan',
  },
];

export { FILTER_KEYS_ASSOC, FILTER_HADNLERS_OR_LOGIC, SELECT_FILTER_TYPE_RE, TABULATOR_FILTERS };
