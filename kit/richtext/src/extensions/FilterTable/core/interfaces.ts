import type { ColumnDefinition, SortDirection } from 'tabulator-tables';
import type { TableOptions } from '@tiptap/extension-table';

type FilterType =
  | 'notLike'
  | 'like'
  | 'notEqual'
  | 'equal'
  | 'lessThan'
  | 'greaterThan'
  | 'equalSelect'
  | 'notEqualSelect';

interface FilterItemType {
  col: string;
  type: FilterType;
  value: string;
}

interface SortItemType {
  column: string;
  dir: SortDirection;
}

type RowContent = Record<string, string>;

type TableColumsLayoutType = 'fitData' | 'fitColumns' | 'fitDataFill' | 'fitDataStretch' | 'fitDataTable';
type SummaryRowOperator = 'none' | 'sum' | 'mult' | 'max' | 'avg' | 'min' | 'count';
type CalcColumnOperator = 'none' | 'sum' | 'mult' | 'max' | 'avg' | 'min';

interface TableInitData {
  columns: ColumnDefinition[];
  data: RowContent[];
}

interface CalcColumnType {
  heading: string;
  columns: string[];
  operator: CalcColumnOperator;
}

interface FilterTableAtributes {
  columnWidths: number[];

  style: string | null;
  filters: FilterItemType[];
  sort: SortItemType | null;

  summaryRow: Record<string, SummaryRowOperator>;
  calcColumn: CalcColumnType | null;
}

interface FilterTableStorage {}

interface FilterTableConfig extends TableOptions {}

interface TableCellAttributes {
  colspan: number;
  rowspan: number;
  colwidth: number;
  backgroundColor: string;
}

type TableCellOnResizeFn = ((event: MouseEvent) => void) | undefined;

export type {
  TableCellAttributes,
  TableCellOnResizeFn,
  RowContent,
  TableColumsLayoutType,
  SummaryRowOperator,
  CalcColumnOperator,
  TableInitData,
  CalcColumnType,
  FilterTableAtributes,
  FilterTableStorage,
  FilterTableConfig,
};
