import { htmlToText } from '../../utils';
import type { FilterType } from '../FilterSelector';
import type { SummaryRowOperator, RowContent } from '../../../core/interfaces';

const FILTRATORS: Record<FilterType, (cellHtmlValue: string, targetValue: string) => boolean> = {
  like: (cV = '', tV = '') => htmlToText(cV).toLowerCase().includes(tV.toLowerCase()),
  notLike: (cV = '', tV = '') => !htmlToText(cV).toLowerCase().includes(tV.toLowerCase()),

  equal: (cV = '', tV = '') => htmlToText(cV).toLowerCase().trim() === tV.toLowerCase().trim(),
  equalSelect: (cV = '', tV = '') => htmlToText(cV).toLowerCase().trim() === tV.toLowerCase().trim(),

  notEqual: (cV = '', tV = '') => htmlToText(cV).toLowerCase().trim() !== tV.toLowerCase().trim(),
  notEqualSelect: (cV = '', tV = '') => htmlToText(cV).toLowerCase().trim() !== tV.toLowerCase().trim(),

  lessThan: (cV = '', tV = '') => +htmlToText(cV).trim() < +tV.trim(),
  greaterThan: (cV = '', tV = '') => +htmlToText(cV).trim() > +tV.trim(),
};

const sum = (values: number[]): number => {
  return values.reduce((acc, value) => acc + value, 0);
};

const mult = (values: number[]): number => {
  if (values.every((value) => value === 1)) {
    return 0;
  }

  return values.reduce((acc, value) => acc * value, 1);
};

const avg = (values: number[]): number => {
  const validValues = values.filter((value) => !isNaN(value));
  return validValues.length > 0 ? sum(validValues) / validValues.length : 0;
};

const max = (values: number[]): number => {
  return values.reduce((acc, value) => (value > acc ? value : acc), -Infinity);
};

const min = (values: number[]): number => {
  return values.reduce((acc, value) => (value < acc ? value : acc), Infinity);
};

const parseValue = (value: string, operationType: string): number => {
  const text = htmlToText(value).trim();

  if (text === '') {
    switch (operationType) {
      case 'sum':
        return 0;
      case 'mult':
        return 1;
      default:
        return NaN;
    }
  }

  return Number(text);
};

const extractValues = (data: RowContent[], colName: string, operationType: string): number[] => {
  return data.map((row) => parseValue(row[colName], operationType));
};

const calculateSummaryRow = (
  data: RowContent[],
  colName: string,
  operation: (values: number[]) => number,
  operationName: string,
  operationType: string,
): string => {
  const values = extractValues(data, colName, operationType);
  const hasNaN = values.some(isNaN);

  return hasNaN ? 'Ошибка вычислений' : `${operation(values)} (${operationName})`;
};

const SUMMARY_ROW_OPERATORS: Record<SummaryRowOperator, (visibleData: RowContent[], targetColName: string) => string> =
  {
    sum: (d: RowContent[], colName: string): string => {
      return calculateSummaryRow(d, colName, sum, 'сумма', 'sum');
    },

    mult: (d: RowContent[], colName: string): string => {
      return calculateSummaryRow(d, colName, mult, 'умножение', 'mult');
    },

    avg: (d, colName) => `${avg(extractValues(d, colName, 'avg')).toFixed(2)} (среднее)`,

    max: (d, colName) => `${max(extractValues(d, colName, 'max'))} (максимум)`,

    min: (d, colName) => `${min(extractValues(d, colName, 'min'))} (минимум)`,

    count: (d) => `${d.length} (количество)`,

    none: () => '',
  };

const calculateColumn = (
  row: RowContent,
  tCols: string[],
  operation: (values: number[]) => number,
  operationName: string,
  operationType: string,
): string => {
  const values = tCols.map((colName) => parseValue(row[colName], operationType));
  const hasNaN = values.some(isNaN);

  return hasNaN ? 'Ошибка вычислений' : `${operation(values)} (${operationName})`;
};

const CALC_COLUMN_OPERATORS: Record<string, (targetColumns: string[], row: RowContent) => string> = {
  sum: (tCols = [], row = {}) => calculateColumn(row, tCols, sum, 'сумма', 'sum'),

  mult: (tCols = [], row = {}) => calculateColumn(row, tCols, mult, 'умножение', 'mult'),

  avg: (tCols = [], row = {}) => `${avg(tCols.map((colName) => parseValue(row[colName], 'avg'))).toFixed(2)} (среднее)`,

  max: (tCols = [], row = {}) => `${max(tCols.map((colName) => parseValue(row[colName], 'max')))} (максимум)`,

  min: (tCols = [], row = {}) => `${min(tCols.map((colName) => parseValue(row[colName], 'min')))} (минимум)`,

  none: () => '',
};

export { FILTRATORS, SUMMARY_ROW_OPERATORS, CALC_COLUMN_OPERATORS };
