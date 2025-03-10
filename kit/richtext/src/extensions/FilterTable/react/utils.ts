import { parse as parseDateStr, isValid as isDateStrValid, isBefore as isDateBefore } from 'date-fns';
import type { CellComponent, RowComponent } from 'tabulator-tables';
import { FilterItemType, FilterChipProps } from './components';

const htmlToText = (htmlStr: string, persistStringBreaks: boolean = true) => {
  if (!htmlStr) return '';
  if (!/<\/?[a-z][\s\S]*>/i.test(htmlStr)) return htmlStr;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlStr;

  const texts: string[] = [];
  const elements = tempDiv.querySelectorAll('span, p, h1, h2, h3, h4, h5, h6');

  elements.forEach((el) => {
    texts.push(el.textContent || '');
  });

  if (persistStringBreaks) return texts.join('\n');

  return texts.join(' ');
};

const formatCaption = (caption: string) => caption.slice(0, 1).toUpperCase() + caption.slice(1);

const getFiltersChipsData = (filters: FilterItemType[]): FilterChipProps[] => {
  const grouped: Record<string, FilterChipProps> = {};

  filters.forEach(({ col, type, value }) => {
    const groupedKey = `${col}-${type}`;

    if (groupedKey in grouped) {
      grouped[groupedKey].values.push(value);
    } else {
      grouped[groupedKey] = { col, type, values: [value] };
    }
  });

  return Object.values(grouped);
};

const checkFilters = (filters: FilterItemType[], savedFilters: FilterItemType[]) => {
  if (!filters.length && !savedFilters.length) return true;

  const isSavedHasAllCurrent = filters.every(
    ({ col, type, value }) => savedFilters.findIndex((s) => col === s.col && type === s.type && value === s.value) >= 0,
  );

  return filters.length === savedFilters.length && isSavedHasAllCurrent;
};

const tabulatorCellFormatter = (cell: CellComponent) => {
  // хак для выборки bgc цвета из дата-атрибута html-обертки
  const dummyEl = document.createElement('div');
  dummyEl.innerHTML = cell.getValue();
  const cellBgc = (dummyEl.querySelector('div[data-wrapper="true"]') as HTMLDivElement)?.dataset['bgc'];
  dummyEl.remove();

  cell.getElement().style.setProperty('background-color', cellBgc || 'transparent');

  return cell.getValue();
};

const tabulatorCellSorter = (a: string, b: string, aRow: RowComponent, bRow: RowComponent) => {
  const [cellA, cellB] = [htmlToText(a).trim(), htmlToText(b).trim()];
  const [dateA, dateB] = [parseDateStr(cellA, 'd/M/yyyy', new Date()), parseDateStr(cellB, 'd/M/yyyy', new Date())];

  if (aRow.getData().isCalculatedSummary || bRow.getData().isCalculatedSummary) return 0;

  if (isDateStrValid(dateA) && isDateStrValid(dateB)) return isDateBefore(dateA, dateB) ? -1 : 1;
  if (!isNaN(+cellA) && !isNaN(+cellB)) return +cellA - +cellB;

  return cellA.slice(0, 10).localeCompare(cellB.slice(0, 10));
};

export { htmlToText, formatCaption, getFiltersChipsData, checkFilters, tabulatorCellFormatter, tabulatorCellSorter };
